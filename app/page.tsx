import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Subsidiaries from '@/components/Subsidiaries';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-neon-cyan/30 selection:text-white">
      <Navbar />
      <Hero />
      <Subsidiaries />
      <Contact />
      
      <footer className="py-12 text-center text-white/10 text-[8px] font-mono border-t border-white/5 bg-[#050510]">
        <p className="tracking-[1em] uppercase">&copy; 2026 9TH REALM STRATEGIC. ALL SYSTEMS NOMINAL.</p>
      </footer>
    </main>
  );
}
