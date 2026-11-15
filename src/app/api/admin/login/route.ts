import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPool, initDb, verifyPassword } from "@/lib/db";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your admin email address." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter your admin password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Ensure database and admin table exist
    try {
      await initDb();
    } catch (dbInitErr) {
      console.error("Database initialization error:", dbInitErr);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed. Please ensure MySQL service is running on port 3306.",
        },
        { status: 500 }
      );
    }

    // 2. Query admin user from MySQL database
    const pool = await getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id, email, password_hash, name, role FROM admin_users WHERE LOWER(email) = ? LIMIT 1",
      [cleanEmail]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 3. Verify password hash
    const isPasswordValid = verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    // 4. Create secure session token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: Date.now(),
    };
    const sessionToken = Buffer.from(JSON.stringify(tokenPayload)).toString("base64url");

    // 5. Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set("yet_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Admin authenticated successfully via MySQL database.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    console.error("Admin login API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
