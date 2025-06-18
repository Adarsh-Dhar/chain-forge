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