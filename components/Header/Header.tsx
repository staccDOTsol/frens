import { Env } from '@/providers/useEnv';
import {
  Center,
  Container,
  Flex,
  Group,
  Menu,
  Title,
} from '@mantine/core';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './Header.module.css';

export function Header({ env, setEnv }: { env: string; setEnv: (env: Env) => void }) {
  return (
    <Container
      size="xl"
      h={80}
      pt={12}
    >
      <div className={classes.inner}>
        <Flex justify="center" align="center" gap="md">
         
          <Title order={2}>Metaplex Mantine Template</Title>
        </Flex>
        <Group>
          <WalletMultiButton />
          <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <a
                href={undefined}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <span className={classes.linkLabel}>{env}</span>
                  <IconChevronDown size="0.9rem" stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setEnv('mainnet')}>Mainnet</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Container>
  );
}
