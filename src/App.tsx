import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 10, 100);
        return next;
      });
    }, 120);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [progress]);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary text-text-primary p-6"
        >
          <div className="text-center max-w-sm">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Loading Portfolio
            </div>
            <div className="text-[70px] font-mono font-semibold text-accent-cyan mb-4">
              {progress}%
            </div>
            <div className="h-2 w-full bg-bg-accent rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent-cyan transition-[width] duration-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-text-secondary">
              Technical Stack v2.5.0 • Karachi, PK
            </p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-accent-cyan selection:text-bg-primary">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}
