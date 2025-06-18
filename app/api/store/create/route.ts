import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, FileType } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { path, type, content } = await req.json();
    if (!path || !type) {
      return NextResponse.json({ error: "Missing path or type" }, { status: 400 });
    }
    // Prevent directory traversal
    if (path.includes("..")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    const name = path.split("/").pop();
    const node = await prisma.fileNode.create({
      data: {
        name,
        path,
        type,
        content: type === "file" ? content || "" : null,
      },
    });
    return NextResponse.json({ success: true, node });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 