import { NextRequest, NextResponse } from "next/server";
import { startCodeServer } from "../../../lib/store/backend/codeServerManager";

// Simulate user auth (replace with real auth)
const getUserId = () => "user" + Math.floor(Math.random() * 10000);

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId();
    const instance = await startCodeServer(userId);
    return NextResponse.json(instance);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}