import Background from '@/components/background';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-1">{children}</main>
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
}
