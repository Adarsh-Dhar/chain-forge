"use client";

import { useAtom } from 'jotai';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { dappConfigAtom } from '@/lib/atoms';
import { VRFConfigPanel } from '@/components/vrf-config-panel';
import { Settings, Link, Zap, TrendingUp, Dice6 } from 'lucide-react';

export function ChainlinkDashboard() {
  const [dappConfig, setDappConfig] = useAtom(dappConfigAtom);

  const toggleService = (serviceName: string) => {
    setDappConfig(prev => ({
      ...prev,
      chainlinkServices: prev.chainlinkServices.map(service =>
        service.name === serviceName
          ? { ...service, enabled: !service.enabled }
          : service
      ),
    }));
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'VRF':
        return <Dice6 className="w-5 h-5 text-purple-600" />;
      case 'Feeds':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'Automation':
        return <Zap className="w-5 h-5 text-blue-600" />;
      default:
        return <div className="w-5 h-5 bg-muted rounded-md"></div>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Network Status */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link className="w-4 h-4 text-primary" />
            Network Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">Network</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-medium text-xs px-2 py-1">
              {dappConfig.networkStatus.network}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">LINK Balance</span>
            <span className="font-semibold text-foreground text-sm">{dappConfig.networkStatus.linkBalance} LINK</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">Active Subscriptions</span>
            <span className="font-semibold text-foreground text-sm">{dappConfig.networkStatus.activeSubscriptions}</span>
          </div>
        </CardContent>
      </Card>

      {/* Chainlink Services */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Chainlink Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dappConfig.chainlinkServices.map((service, index) => (
            <div key={service.name}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getServiceIcon(service.name)}
                  <div>
                    <div className="font-semibold text-foreground text-sm">{service.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {service.name === 'VRF' && 'Verifiable Random Function'}
                      {service.name === 'Feeds' && 'Price Data Feeds'}
                      {service.name === 'Automation' && 'Automated Execution'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {service.configured && service.enabled && (
                    <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                      Configured
                    </Badge>
                  )}
                  <Switch
                    checked={service.enabled}
                    onCheckedChange={() => toggleService(service.name)}
                  />
                </div>
              </div>
              
              {service.enabled && (
                <div className="mt-2 pl-7">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start btn-modern px-3 py-2 text-xs"
                    disabled={service.configured}
                  >
                    <Settings className="w-3 h-3 mr-2" />
                    {service.configured ? 'Configured' : 'Configure'}
                  </Button>
                </div>
              )}
              
              {index < dappConfig.chainlinkServices.length - 1 && (
                <Separator className="mt-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* VRF Configuration Panel */}
      {dappConfig.chainlinkServices.find(s => s.name === 'VRF')?.enabled && (
        <VRFConfigPanel />
      )}

      {/* Quick Actions */}
      <Card className="glass border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start btn-modern px-3 py-2 text-xs">
            <Link className="w-3 h-3 mr-2" />
            Add LINK to Wallet
          </Button>
          <Button variant="outline" className="w-full justify-start btn-modern px-3 py-2 text-xs">
            <Settings className="w-3 h-3 mr-2" />
            Network Settings
          </Button>
          <Button variant="outline" className="w-full justify-start btn-modern px-3 py-2 text-xs">
            <TrendingUp className="w-3 h-3 mr-2" />
            View Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}