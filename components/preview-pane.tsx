"use client";

import { useAtom } from 'jotai';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { previewModeAtom, dappConfigAtom } from '@/lib/atoms';
import { Monitor, Smartphone, Play, Code, ExternalLink } from 'lucide-react';

export function PreviewPane() {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);
  const [dappConfig] = useAtom(dappConfigAtom);

  return (
    <div className="space-y-4">
      {/* Preview Controls */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Live Preview</span>
            <div className="flex gap-1">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className="btn-modern px-2 py-1"
              >
                <Monitor className="w-3 h-3" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className="btn-modern px-2 py-1"
              >
                <Smartphone className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Device Frame */}
            <div className={`mx-auto bg-gray-900 rounded-xl p-3 ${
              previewMode === 'mobile' ? 'w-48 h-72' : 'w-full h-48'
            }`}>
              <div className="w-full h-full bg-gradient-to-br from-background to-muted rounded-lg flex items-center justify-center">
                {dappConfig.prompt ? (
                  <div className="text-center space-y-3 p-4">
                    <div className="w-8 h-8 bg-primary rounded-lg mx-auto flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {dappConfig.prompt.split(' ').slice(0, 3).join(' ')}...
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {dappConfig.detectedServices.map(service => (
                        <Badge key={service} variant="secondary" className="text-xs font-medium px-2 py-1">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Monitor className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-xs">Preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 btn-modern px-3 py-2 text-xs">
                <Code className="w-3 h-3 mr-1" />
                View Code
              </Button>
              <Button variant="outline" size="sm" className="flex-1 btn-modern px-3 py-2 text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                Open
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chainlink Status HUD */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Chainlink Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Network</span>
            <Badge variant="outline" className="text-xs font-medium px-2 py-1">
              {dappConfig.networkStatus.network}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">LINK Balance</span>
            <span className="text-xs font-semibold text-foreground">
              {dappConfig.networkStatus.linkBalance} (Test)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Active Subscriptions</span>
            <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
              {dappConfig.networkStatus.activeSubscriptions}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-center text-muted-foreground py-6">
              <div className="w-8 h-8 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 opacity-50" />
              </div>
              <p className="text-xs font-medium">No deployments yet</p>
              <p className="text-xs">Your generated dApps will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}