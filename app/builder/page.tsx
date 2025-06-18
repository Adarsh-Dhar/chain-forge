"use client";

import { useState } from 'react';
import { useAtom } from 'jotai';
import { ChainlinkLogo } from '@/components/chainlink-logo';
import { PromptPanel } from '@/components/prompt-panel';
import { ChainlinkDashboard } from '@/components/chainlink-dashboard';
import { PreviewPane } from '@/components/preview-pane';
import { dappConfigAtom } from '@/lib/atoms';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Builder() {
  const [dappConfig] = useAtom(dappConfigAtom);

  // New state for file/folder creation
  const [createPath, setCreatePath] = useState("");
  const [createType, setCreateType] = useState<'file' | 'folder'>('file');
  const [createContent, setCreateContent] = useState("");
  const [createStatus, setCreateStatus] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreate = async () => {
    setCreateLoading(true);
    setCreateStatus(null);
    try {
      const res = await fetch("/api/store/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: createPath, type: createType, content: createType === 'file' ? createContent : undefined })
      });
      const data = await res.json();
      if (data.success) setCreateStatus("Created successfully!");
      else setCreateStatus(data.error || "Failed to create.");
    } catch (e) {
      setCreateStatus("Error: " + String(e));
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 glass">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <ChainlinkLogo />
          <div>
            <h1 className="text-xl font-bold text-foreground">
              ChainForge Builder
            </h1>
            <p className="text-xs text-muted-foreground">
              Create your Chainlink dApp
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 py-2">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 py-2">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* File/Folder Creation UI */}
        <div className="mb-6 p-4 rounded-lg bg-white/80 shadow flex flex-col md:flex-row items-center gap-4">
          <input
            className="input input-bordered px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Path (e.g. myfolder/newfile.txt)"
            value={createPath}
            onChange={e => setCreatePath(e.target.value)}
            style={{ minWidth: 220 }}
          />
          <select
            className="input input-bordered px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={createType}
            onChange={e => setCreateType(e.target.value as 'file' | 'folder')}
          >
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </select>
          {createType === 'file' && (
            <input
              className="input input-bordered px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="File content (optional)"
              value={createContent}
              onChange={e => setCreateContent(e.target.value)}
              style={{ minWidth: 220 }}
            />
          )}
          <button
            className="btn btn-primary px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            onClick={handleCreate}
            disabled={createLoading || !createPath}
          >
            {createLoading ? "Creating..." : `Create ${createType}`}
          </button>
          {createStatus && (
            <span className="ml-4 text-sm text-gray-700">{createStatus}</span>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Left: Preview Pane */}
          <div className="lg:col-span-1">
            <PreviewPane />
          </div>

          {/* Center: Prompt Panel */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <PromptPanel />
          </div>

          {/* Right: Chainlink Dashboard */}
          <div className="lg:col-span-1">
            <ChainlinkDashboard />
          </div>
        </div>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}