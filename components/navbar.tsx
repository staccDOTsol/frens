import '@solana/wallet-adapter-react-ui/styles.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const routes = [
    {
      path: '/',
      label: 'Home',
    },
  ];
  return (
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
        <div className="flex items-center gap-6 text-lg">
          <div className="space-x-6 hidden md:block">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="hover:text-black/70"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
