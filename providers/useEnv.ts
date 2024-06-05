import {
  createContext,
  useContext,
} from 'react';

export type Env =  'mainnet';

type EnvContext = {
  env: Env;
};

const DEFAULT_CONTEXT: EnvContext = {
  env: 'mainnet',
};

export const EnvContext = createContext<EnvContext>(DEFAULT_CONTEXT);

export function useEnv(): Env {
  const { env } = useContext(EnvContext);
  return env;
}
