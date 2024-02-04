import Background from '@/components/background';
import Navbar from '@/components/navbar';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col relative">
      <Background />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
