'use client';

import '@solana/wallet-adapter-react-ui/styles.css';

import {
  ReactNode,
  useMemo,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
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
          <div className="bg-transparent">
            <nav className="max-w-[1640px] mx-auto flex justify-between items-center p-6">
              <Link href="/">
                <Image
                  src="/images/frens-logo-17.png"
                  alt="Fens Loog"
                  height={150}
                  width={150}
                />
              </Link>
              <WalletMultiButton />
            </nav>
          </div>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

