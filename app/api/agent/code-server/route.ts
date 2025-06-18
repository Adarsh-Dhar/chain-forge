import { NextRequest, NextResponse } from "next/server";
import { startCodeServer } from "../../../../lib/store/backend/codeServerManager";
import { writeCodeFromPrompts } from "../../../agent/code-server";
import path from "path";
import fs from "fs";
import os from "os";
import { exec } from "child_process";

// Simulate user auth (replace with real auth)
const getUserId = () => "user" + Math.floor(Math.random() * 10000);

function execAsync(cmd: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(stderr || err);
      else resolve({ stdout, stderr });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompts = body.prompts;
    if (!Array.isArray(prompts) || prompts.length === 0) {
      return NextResponse.json({ error: "Missing or invalid prompts" }, { status: 400 });
    }
    const userId = getUserId();
    const instance = await startCodeServer(userId);
    const containerId = instance.containerId;

    // Wait for code-server to be ready (in production, poll or check health)
    await new Promise(res => setTimeout(res, 3000));

    // Write code to a temp directory on the host
    const tempDir = path.join(os.tmpdir(), `project-${userId}-${Date.now()}`);
    fs.mkdirSync(tempDir, { recursive: true });
    await writeCodeFromPrompts(prompts, tempDir);

    // Copy files into the running container's /home/coder/project
    const dockerCpCmd = `docker cp ${tempDir}/. ${containerId}:/home/coder/project/`;
    try {
      await execAsync(dockerCpCmd);
    } catch (err) {
      // Clean up temp dir before throwing
      fs.rmSync(tempDir, { recursive: true, force: true });
      return NextResponse.json({ error: `docker cp failed: ${err}` }, { status: 500 });
    }

    // Clean up temp dir
    fs.rmSync(tempDir, { recursive: true, force: true });

    return NextResponse.json({
      codeServer: instance,
      message: "Code written to code-server instance.",
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 