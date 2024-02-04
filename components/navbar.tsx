import Link from 'next/link';

export default function Navbar() {
  const routes = [
    {
      path: '/',
      label: 'Welcome Page',
    },
    {
      path: '/home',
      label: 'App Home',
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
    <div className="flex  justify-between items-center p-6">
      <div>Navbar</div>
      <div className="space-x-6">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
