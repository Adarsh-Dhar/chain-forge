import { atom } from 'jotai';

export interface ChainlinkService {
  name: string;
  enabled: boolean;
  configured: boolean;
  icon: string;
}

export interface VRFConfig {
  subscriptionId: string;
  callbackGasLimit: number;
  numWords: number;
  requestConfirmations: number;
}

export interface DAppConfig {
  prompt: string;
  detectedServices: string[];
  chainlinkServices: ChainlinkService[];
  vrfConfig: VRFConfig;
  networkStatus: {
    network: string;
    linkBalance: string;
    activeSubscriptions: number;
  };
}

export const dappConfigAtom = atom<DAppConfig>({
  prompt: '',
  detectedServices: [],
  chainlinkServices: [
    { name: 'VRF', enabled: false, configured: false, icon: '🎲' },
    { name: 'Feeds', enabled: false, configured: false, icon: '📊' },
    { name: 'Automation', enabled: false, configured: false, icon: '⚡' },
  ],
  vrfConfig: {
    subscriptionId: '',
    callbackGasLimit: 100000,
    numWords: 1,
    requestConfirmations: 3,
  },
  networkStatus: {
    network: 'Sepolia (Testnet)',
    linkBalance: '10.25',
    activeSubscriptions: 1,
  },
});

export const previewModeAtom = atom<'mobile' | 'desktop'>('desktop');