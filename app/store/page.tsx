"use client";

import React, { useState } from "react";
import axios from "axios";

interface CodeServerInstance {
  url: string;
  password: string;
  containerId: string;
  port: number;
}

export default function Home() {
  const [instance, setInstance] = useState<CodeServerInstance | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartCodeServer = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/store");
      setInstance(res.data);
    } catch (error) {
      alert("Failed to start code-server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Launch Your code-server Instance</h1>
      <button onClick={handleStartCodeServer} disabled={loading}>
        {loading ? "Starting..." : "Start code-server"}
      </button>

      {instance && (
        <div style={{ marginTop: 20 }}>
          <h2>Your code-server is ready!</h2>
          <p>
            <b>URL:</b> <a href={instance.url} target="_blank" rel="noopener noreferrer">{instance.url}</a>
          </p>
          <p>
            <b>Password:</b> {instance.password}
          </p>
          <iframe
            src={instance.url}
            style={{ width: "100%", height: 600, border: "1px solid #ccc" }}
            title="code-server"
          />
        </div>
      )}
    </div>
  );
}