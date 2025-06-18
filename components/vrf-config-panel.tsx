"use client";

import { useAtom } from 'jotai';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dappConfigAtom } from '@/lib/atoms';
import { Dice6 } from 'lucide-react';

export function VRFConfigPanel() {
  const [dappConfig, setDappConfig] = useAtom(dappConfigAtom);

  const updateVRFConfig = (field: string, value: any) => {
    setDappConfig(prev => ({
      ...prev,
      vrfConfig: {
        ...prev.vrfConfig,
        [field]: value,
      },
    }));
  };

  return (
    <Card className="glass border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Dice6 className="w-4 h-4 text-purple-600" />
          VRF Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subscription-id" className="text-xs font-semibold text-foreground">
            Subscription ID
          </Label>
          <Input
            id="subscription-id"
            placeholder="Enter your VRF subscription ID"
            value={dappConfig.vrfConfig.subscriptionId}
            onChange={(e) => updateVRFConfig('subscriptionId', e.target.value)}
            className="bg-background/50 backdrop-blur-sm border-border/50 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">
            Callback Gas Limit: {dappConfig.vrfConfig.callbackGasLimit.toLocaleString()}
          </Label>
          <Slider
            value={[dappConfig.vrfConfig.callbackGasLimit]}
            onValueChange={(value) => updateVRFConfig('callbackGasLimit', value[0])}
            max={500000}
            min={50000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>50k</span>
            <span>500k</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="num-words" className="text-xs font-semibold text-foreground">
            Number of Random Words
          </Label>
          <Input
            id="num-words"
            type="number"
            min="1"
            max="5"
            value={dappConfig.vrfConfig.numWords}
            onChange={(e) => updateVRFConfig('numWords', parseInt(e.target.value))}
            className="bg-background/50 backdrop-blur-sm border-border/50 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">
            Request Confirmations
          </Label>
          <Select
            value={dappConfig.vrfConfig.requestConfirmations.toString()}
            onValueChange={(value) => updateVRFConfig('requestConfirmations', parseInt(value))}
          >
            <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border/50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 confirmations</SelectItem>
              <SelectItem value="5">5 confirmations</SelectItem>
              <SelectItem value="10">10 confirmations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Estimated Cost per Request</span>
            <span className="font-semibold text-foreground">~0.25 LINK</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}