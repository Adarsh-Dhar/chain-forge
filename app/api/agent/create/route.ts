import { NextRequest, NextResponse } from "next/server";
import {
  BASE_PROMPT,
  getSystemPrompt,
  defaultPrompts,
  reactPrompts,
} from "../index";

// Helper to call OpenRouter as a Claude/Anthropic stand-in
async function callOpenRouter(messages: any[], system: string, max_tokens: number) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
  const SITE_NAME = process.env.SITE_NAME || "Chain Forge";

  if (!OPENROUTER_API_KEY) {
    throw new Error("Missing OpenRouter API key");
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
      messages,
      max_tokens,
      system,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { pathname } = new URL(req.url);
  if (pathname.endsWith("/template") || pathname.endsWith("/create")) {
    // Handle /template or /create
    try {
      const body = await req.json();
      const prompt = body.prompt;
      if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 });
      }
      // Update the system prompt for DeepSeek
      const system = `You are an expert developer. Given the following user prompt, describe in your reasoning whether the project should be built using React (for web apps with components, JSX, etc.) or Node.js (for backend/server apps). Use clear language in your reasoning so it is easy to detect which technology is most appropriate.`;
      const messages = [{ role: "user", content: prompt }];
      const data = await callOpenRouter(messages, system, 10000);
      let answer = data.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        answer = data.choices?.[0]?.message?.reasoning?.trim();
      }
      console.log("Model answer:", JSON.stringify(answer));
      const reasoning = answer?.toLowerCase();
      // Heuristic: look for keywords
      if (reasoning?.includes("react") || reasoning?.includes("jsx") || reasoning?.includes("component")) {
        return NextResponse.json({
          prompts: [
            BASE_PROMPT,
            `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactPrompts.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
          ],
          uiPrompts: [reactPrompts.basePrompt],
        });
      }
      if (reasoning?.includes("node.js") || reasoning?.includes("nodejs") || reasoning?.includes("server")) {
        return NextResponse.json({
          prompts: [
            `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${defaultPrompts.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
          ],
          uiPrompts: [defaultPrompts.basePrompt],
        });
      }
      // Fallback: if it mentions only HTML/CSS/JS, default to React
      if (reasoning?.includes("html") || reasoning?.includes("css") || reasoning?.includes("javascript")) {
        return NextResponse.json({
          prompts: [
            BASE_PROMPT,
            `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactPrompts.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
          ],
          uiPrompts: [reactPrompts.basePrompt],
        });
      }
      console.error("Unrecognized model answer. Full data:", JSON.stringify(data));
      return NextResponse.json({ message: "You cant access this", modelAnswer: answer }, { status: 403 });
    } catch (error: any) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }
  } else if (pathname.endsWith("/chat")) {
    // Handle /chat
    try {
      const body = await req.json();
      const messages = body.messages;
      if (!Array.isArray(messages)) {
        return NextResponse.json({ error: "Missing or invalid messages" }, { status: 400 });
      }
      const data = await callOpenRouter(messages, getSystemPrompt(), 10000);
      return NextResponse.json({
        response: data.choices?.[0]?.message?.content,
      });
    } catch (error: any) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
} 