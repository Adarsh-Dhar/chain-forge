"use client";

import React, { useState } from "react";
import axios from "axios";

export default function AgentPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string[] | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<string[] | null>(null);
  const [codeServer, setCodeServer] = useState<any>(null);
  const [csLoading, setCSLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setPrompts(null);
    setCodeServer(null);
    try {
      const res = await fetch("/api/agent/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch (jsonErr) {
        console.error("Non-JSON response:", raw);
        setError("Server error: Unexpected response format.");
        setLoading(false);
        return;
      }
      console.log("OpenRouter API response:", data);
      if (res.ok) {
        if (data.prompts && Array.isArray(data.prompts)) {
          setResult(data.prompts);
          setPrompts(data.prompts);
        } else if (data.uiPrompts && Array.isArray(data.uiPrompts)) {
          setResult(data.uiPrompts);
          setPrompts(data.uiPrompts);
        } else {
          setError("Server error: Unexpected model response.");
        }
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCodeServer = async () => {
    if (!prompts) return;
    setCSLoading(true);
    try {
      const res = await axios.post("/api/agent/code-server", { prompts });
      setCodeServer(res.data.codeServer);
    } catch (err) {
      alert("Failed to create code-server.");
    } finally {
      setCSLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">AI App Generator</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700"
            placeholder="Describe the app you want to create (e.g., 'A todo app with categories and dark mode')"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Generating..." : "Generate App Code"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Generated Prompts:</h2>
            {Array.isArray(result)
              ? result.map((prompt, idx) => (
                  <pre
                    key={idx}
                    className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap mb-4"
                    style={{ wordBreak: "break-all" }}
                  >
                    {prompt}
                  </pre>
                ))
              : (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap">
                  {result}
                </pre>
              )
            }
            {prompts && !codeServer && (
              <button
                className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 mt-4"
                onClick={handleCreateCodeServer}
                disabled={csLoading}
              >
                {csLoading ? "Creating code-server..." : "Open in code-server"}
              </button>
            )}
            {codeServer && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Your code-server is ready!</h2>
                <p>
                  <b>URL:</b> <a href={codeServer.url} target="_blank" rel="noopener noreferrer">{codeServer.url}</a>
                </p>
                <p>
                  <b>Password:</b> {codeServer.password}
                </p>
                <iframe
                  src={codeServer.url}
                  style={{ width: "100%", height: 600, border: "1px solid #ccc" }}
                  title="code-server"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
