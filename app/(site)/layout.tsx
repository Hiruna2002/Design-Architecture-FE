import Navbar from '@/components/Common/NavBar';
import Footer from '@/components/Common/Footer';
import InitialLoader from '@/components/Common/InitialLoader';
import CustomCursor from '@/components/Common/CustomCursor';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InitialLoader>
      <CustomCursor />

      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </InitialLoader>
  );
}