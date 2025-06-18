import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
    const SITE_NAME = process.env.SITE_NAME || "Chain Forge";

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "Missing OpenRouter API key" }, { status: 500 });
    }

    const body = await req.json();
    const prompt = body.prompt;
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 