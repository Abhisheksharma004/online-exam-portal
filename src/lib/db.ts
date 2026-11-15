import mysql from "mysql2/promise";
import crypto from "node:crypto";

const dbConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "exam_test_portal",
};

// Global pool cache for Next.js hot-reloading
declare global {
  var _mysqlPool: mysql.Pool | undefined;
  var _mysqlDbInitialized: boolean | undefined;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  if (storedHash === password) return true; // Plain fallback support

  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === key;
}

export async function getPool(): Promise<mysql.Pool> {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return global._mysqlPool;
}

/**
 * Initializes the database, admin_users table, and seeds the required admin credentials.
 */
export async function initDb(): Promise<void> {
  if (global._mysqlDbInitialized) return;

  // 1. Connect without database selected to ensure database exists
  const rootConn = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  try {
    // Create database if not exists
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  } finally {
    await rootConn.end();
  }

  // 2. Connect to the database pool and create table + seed user
  const pool = await getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(191) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL DEFAULT 'Admin Controller',
      role VARCHAR(50) NOT NULL DEFAULT 'super_admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Seed requested Admin User
  const defaultEmail = "jyotiinfotech.04@gmail.com";
  const defaultPassword = "Admin@2022";
  const defaultName = "Jyoti Infotech Admin";

  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT id, password_hash FROM admin_users WHERE email = ? LIMIT 1",
    [defaultEmail]
  );

  if (!rows || rows.length === 0) {
    const passwordHash = hashPassword(defaultPassword);
    await pool.query(
      "INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, 'super_admin')",
      [defaultEmail, passwordHash, defaultName]
    );
  } else {
    // Verify existing password; if mismatched, update it to the requested Admin@2022
    const currentHash = rows[0].password_hash;
    if (!verifyPassword(defaultPassword, currentHash)) {
      const updatedHash = hashPassword(defaultPassword);
      await pool.query(
        "UPDATE admin_users SET password_hash = ?, name = ? WHERE email = ?",
        [updatedHash, defaultName, defaultEmail]
      );
    }
  }

  global._mysqlDbInitialized = true;
}
