'use client';

import {
  ReactNode,
  useMemo,
  useState,
} from 'react';

import Navbar from '@/components/navbar';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

export function Providers({ children }: { children: ReactNode }) {
  const [env, setEnv] = useState<any>('mainnet')
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );




  // useEffect(() => {
  //   if (env === 'devnet' && queryEnv !== 'devnet') {
  //     doSetEnv('devnet');
  //   }
  // }, []);

  const endpoint = useMemo(() => {
    switch (env) {
      case 'mainnet':
        return process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
      default:
        return process.env.NEXT_PUBLIC_DEVNET_RPC_URL;
    }
  }, [env]);

      
    return (
      <ConnectionProvider endpoint={endpoint as string}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  <Navbar />
                  {children}
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}
