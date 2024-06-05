'use client';

import {
  ReactNode,
  useMemo,
  useState,
} from 'react';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { EnvProvider } from './EnvProvider';
import { Env } from './useEnv';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryEnv = searchParams.get('env');
  const [client] = useState(new QueryClient());
  const [env, setEnv] = useState<Env>('mainnet')
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  const doSetEnv = (e: Env) => {
    const params = new URLSearchParams(window.location.search);
    params.set('env', e);

    setEnv(e);
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <EnvProvider env={env!}>
      
      <ConnectionProvider endpoint={endpoint!}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
              <QueryClientProvider client={client}>
                  <Notifications />
                  <AppShell
                    header={{ height: 80 }}
                   
                  >s
                    <AppShell.Main>
                      {children}
                    </AppShell.Main>
                  </AppShell>
              </QueryClientProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </EnvProvider>
  );
}
