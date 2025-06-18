"use client";

import { ChainlinkLogo } from '@/components/chainlink-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Code, Play, Dice6, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

const examples = [
  {
    title: "NFT Raffle dApp",
    description: "A decentralized raffle system using Chainlink VRF for provably fair random winner selection.",
    services: ["VRF"],
    complexity: "Beginner",
    icon: Dice6,
    color: "from-purple-500 to-purple-600",
    features: ["Random Winner Selection", "Automated Prize Distribution", "Transparent Results"]
  },
  {
    title: "Prediction Market",
    description: "Create prediction markets with real-time price feeds and automated settlement.",
    services: ["Feeds", "Automation"],
    complexity: "Intermediate",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    features: ["Real-time Price Data", "Automated Settlement", "Multi-asset Support"]
  },
  {
    title: "Yield Farming Optimizer",
    description: "Automatically optimize yield farming strategies based on market conditions.",
    services: ["Feeds", "Automation"],
    complexity: "Advanced",
    icon: Zap,
    color: "from-blue-500 to-cyan-600",
    features: ["Strategy Automation", "Risk Management", "Portfolio Rebalancing"]
  },
  {
    title: "Decentralized Lottery",
    description: "A transparent lottery system with VRF randomness and scheduled draws.",
    services: ["VRF", "Automation"],
    complexity: "Intermediate",
    icon: Dice6,
    color: "from-indigo-500 to-purple-600",
    features: ["Scheduled Draws", "Transparent Randomness", "Automatic Payouts"]
  },
  {
    title: "Price-Triggered Swaps",
    description: "Execute token swaps automatically when price conditions are met.",
    services: ["Feeds", "Automation"],
    complexity: "Intermediate",
    icon: TrendingUp,
    color: "from-orange-500 to-red-600",
    features: ["Price Monitoring", "Conditional Execution", "Slippage Protection"]
  },
  {
    title: "Dynamic NFT Collection",
    description: "NFTs that evolve based on external data and random events.",
    services: ["VRF", "Feeds"],
    complexity: "Advanced",
    icon: Zap,
    color: "from-pink-500 to-rose-600",
    features: ["Dynamic Metadata", "External Data Integration", "Random Evolution"]
  }
];

export default function Examples() {
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
              dApp Examples
            </h1>
            <p className="text-xs text-muted-foreground">
              Explore what you can build
            </p>
          </div>
        </div>
        
        <Link href="/builder">
          <Button className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2">
            <Play className="h-4 w-4 mr-2" />
            Start Building
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Chainlink dApp Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get inspired by these production-ready examples. Each template showcases different Chainlink services and can be customized to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <Card key={index} className="glass border-0 hover:scale-105 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <Badge 
                      variant={example.complexity === 'Beginner' ? 'secondary' : example.complexity === 'Intermediate' ? 'default' : 'destructive'}
                      className="text-xs font-medium px-2 py-1"
                    >
                      {example.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                        Chainlink Services
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {example.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs font-medium px-2 py-1">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                        Key Features
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1 btn-modern px-3 py-2 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 btn-modern px-3 py-2 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ready to build your own?
              </h3>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Use our AI-powered builder to create custom dApps tailored to your specific needs.
              </p>
              <Link href="/builder">
                <Button size="lg" className="btn-modern bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold px-6 py-3 text-base rounded-lg">
                  Start Building Now
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
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