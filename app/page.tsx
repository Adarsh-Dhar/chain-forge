"use client";

import { ChainlinkLogo } from '@/components/chainlink-logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Github, Twitter, ArrowRight, Code, Sparkles, Shield, TrendingUp, Dice6 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 glass">
        <div className="flex items-center space-x-3">
          <ChainlinkLogo />
          <div>
            <h1 className="text-xl font-bold text-foreground">
              ChainForge
            </h1>
            <p className="text-xs text-muted-foreground">
              AI-powered Chainlink dApp builder
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 py-2">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 py-2">
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Link href="/builder">
            <Button className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center space-y-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold">
              AI-Powered dApp Generation
            </span>
          </div>
          
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Build{' '}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Chainlink
              </span>
              <br />
              dApps with AI
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into production-ready decentralized applications powered by Chainlink's oracle network. 
              No coding required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6">
            <Link href="/builder">
              <Button size="lg" className="btn-modern bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold px-6 py-3 text-base rounded-lg">
                Start Building Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="outline" size="lg" className="btn-modern glass border-2 px-6 py-3 text-base rounded-lg">
                <Code className="w-4 h-4 mr-2" />
                View Examples
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Card className="glass border-0 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Dice6 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Verifiable Randomness
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate provably fair random numbers for games, lotteries, and NFT reveals with Chainlink VRF.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Real-time Price Data
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access decentralized price feeds for thousands of assets with enterprise-grade reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Smart Automation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automate smart contract functions with time-based or condition-based triggers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16">
            <p className="text-xs text-muted-foreground mb-6">
              Trusted by developers building the future of Web3
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 glass border-0 text-xs">
                <Shield className="w-3 h-3 mr-2 text-green-600" />
                Audited Smart Contracts
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 glass border-0 text-xs">
                <Zap className="w-3 h-3 mr-2 text-blue-600" />
                Production Ready
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 glass border-0 text-xs">
                <Code className="w-3 h-3 mr-2 text-purple-600" />
                Open Source
              </Badge>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}