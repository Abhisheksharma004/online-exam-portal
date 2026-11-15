import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import mysql from "mysql2/promise";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("yet_admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    let tokenData: { userId: number; email: string };
    try {
      const decoded = Buffer.from(sessionCookie.value, "base64url").toString("utf-8");
      tokenData = JSON.parse(decoded);
    } catch {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    const pool = await getPool();
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT id, email, name, role, created_at FROM admin_users WHERE id = ? LIMIT 1",
      [tokenData.userId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    const user = rows[0];

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    console.error("Admin verify API error:", error);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 500 }
    );
  }
}

