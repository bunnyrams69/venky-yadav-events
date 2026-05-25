import { useState, useEffect } from 'react';
import { SmoothScrollProvider } from './context/SmoothScroll.jsx';
import Loader from './components/ui/Loader.jsx';
import Navigation from './components/layout/Navigation.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/layout/WhatsAppButton.jsx';
import Hero from './components/sections/Hero.jsx';
import Marquee from './components/sections/Marquee.jsx';
import Services from './components/sections/Services.jsx';
import Features from './components/sections/Features.jsx';
import Portfolio from './components/sections/Portfolio.jsx';
import Process from './components/sections/Process.jsx';
import Clients from './components/sections/Clients.jsx';
import Pricing from './components/sections/Pricing.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Lock scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {/* Loading Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Site Content — rendered immediately but hidden behind loader */}
      <SmoothScrollProvider>
        {/* Noise texture overlay — z-index 9999, pointer-events: none */}
        <div className="texture-overlay" />

        {/* Fixed Navigation — z-index 100 */}
        <Navigation />

        {/* Main Content — z-index 10 */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <Marquee />
          <Services />
          <Features />
          <Portfolio />
          <Process />
          <Clients />
          <Pricing />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Floating CTA — z-index 9000 */}
        <WhatsAppButton />
      </SmoothScrollProvider>
    </>
  );
}
