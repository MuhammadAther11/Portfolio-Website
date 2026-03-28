import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Clock, Calendar, Activity, Globe } from 'lucide-react';

export const RealTimeSidebar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.from(sidebarRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    });

    // Pulse animation for the "Live" indicator
    gsap.to(".live-dot", {
      scale: 1.5,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "sine.out"
    });
  }, { scope: sidebarRef });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
  };

  return (
    <div 
      ref={sidebarRef}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-6 py-8 px-3 bg-bg-secondary/20 backdrop-blur-sm border-r border-bg-accent/30 rounded-r-2xl"
    >
      {/* Real-Time Watch from Image */}
      <div className="flex flex-col items-center">
        <div className="relative py-4">
          <span className="text-xl font-mono font-bold text-accent-cyan vertical-text tracking-[0.3em] drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] opacity-90">
            {formatTime(time)}
          </span>
        </div>
        
        {/* Vertical Line from Image */}
        <div className="w-[2px] h-24 bg-gradient-to-b from-accent-cyan/60 to-transparent rounded-full mt-4 shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
      </div>

      {/* Other minimalist stats */}
      <div className="flex flex-col items-center space-y-6 pt-6">
        <div className="group cursor-help relative">
          <Activity className="w-4 h-4 text-accent-cyan/60 hover:text-accent-cyan transition-colors" />
          <div className="absolute left-full ml-4 px-3 py-1 bg-bg-secondary border border-bg-accent rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            System: Active
          </div>
        </div>
        
        <div className="group cursor-help relative">
          <Globe className="w-4 h-4 text-text-secondary/60 hover:text-accent-cyan transition-colors" />
          <div className="absolute left-full ml-4 px-3 py-1 bg-bg-secondary border border-bg-accent rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            PK
          </div>
        </div>
      </div>
    </div>
  );
};
