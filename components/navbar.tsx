import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const routes = [
    {
      path: '/vaults',
      label: 'Vaults',
    },
    {
      path: '/winners',
      label: 'Winners',
    },
    {
      path: '/history',
      label: 'History',
    },
    {
      path: '/poolers',
      label: 'Poolers',
    },
  ];
  return (
    <div className="bg-transparent">
      <nav className="max-w-[1640px] mx-auto flex justify-between items-center p-6">
        <Link href="/home">
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
          <button className="bg-frensYellow text-sm font-semibold py-3 px-5 rounded-full uppercase hover:bg-[#FFD33F]/80">
            Launch App
          </button>
        </div>
      </nav>
    </div>
  );
}
