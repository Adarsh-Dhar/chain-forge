"use client";

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { dappConfigAtom } from '@/lib/atoms';
import { Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const suggestions = [
  "NFT raffle with random winner selection",
  "Prediction market for ETH price with daily settlement",
  "Automated yield farming optimizer",
  "Decentralized lottery with VRF randomness",
  "Price-triggered token swaps",
];

export function PromptPanel() {
  const [dappConfig, setDappConfig] = useAtom(dappConfigAtom);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const detectChainlinkServices = (prompt: string) => {
    const services = [];
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('random') || lowerPrompt.includes('lottery') || lowerPrompt.includes('raffle')) {
      services.push('VRF');
    }
    if (lowerPrompt.includes('price') || lowerPrompt.includes('feed') || lowerPrompt.includes('market data')) {
      services.push('Feeds');
    }
    if (lowerPrompt.includes('automat') || lowerPrompt.includes('schedul') || lowerPrompt.includes('trigger')) {
      services.push('Automation');
    }
    
    return services;
  };

  const handleGenerate = async () => {
    if (!currentPrompt.trim()) {
      toast.error('Please describe your dApp first');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const detectedServices = detectChainlinkServices(currentPrompt);
    
    setDappConfig(prev => ({
      ...prev,
      prompt: currentPrompt,
      detectedServices,
      chainlinkServices: prev.chainlinkServices.map(service => ({
        ...service,
        enabled: detectedServices.includes(service.name),
      })),
    }));

    setIsGenerating(false);
    toast.success(`Detected ${detectedServices.length} Chainlink services!`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentPrompt(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold">
            AI-Powered Generation
          </span>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
          Describe your{' '}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Chainlink dApp
          </span>
        </h1>
        
        <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Tell us what you want to build and we'll generate the code with integrated Chainlink services.
        </p>
      </div>

      {/* Main Input */}
      <Card className="glass border-0">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Describe your dApp
              </label>
              <Textarea
                placeholder="e.g., 'NFT raffle with random winner selection and automated prize distribution'"
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                className="min-h-[100px] text-base resize-none border-0 focus:ring-2 focus:ring-primary bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Detected Services */}
            {dappConfig.detectedServices.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Detected Chainlink Services
                </label>
                <div className="flex flex-wrap gap-2">
                  {dappConfig.detectedServices.map((service) => (
                    <Badge key={service} className="bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1 text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full btn-modern bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold py-3 text-base rounded-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating dApp...
                </>
              ) : (
                <>
                  Generate dApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground text-center font-medium">
          Try these popular dApp ideas:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 glass rounded-full text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}