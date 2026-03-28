import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { skills } from '../lib/data';
import { Code2, Bot, Wrench } from 'lucide-react';

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".skill-card", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const categories = [
    { title: "Frontend", icon: <Code2 className="w-6 h-6" />, items: skills.frontend, progress: 85 },
    { title: "AI & Agents", icon: <Bot className="w-6 h-6" />, items: skills.ai, progress: 70 },
    { title: "Tools", icon: <Wrench className="w-6 h-6" />, items: skills.tools, progress: 90 },
  ];

  return (
    <section id="skills" ref={containerRef} className="py-16 sm:py-20 bg-bg-primary overflow-hidden relative">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
            <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em]">System Capabilities</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Technical Stack Used</h3>
          <p className="max-w-xl text-text-secondary mt-3 text-sm sm:text-base">
            A curated set of frontend technologies and tools currently used across the portfolio.
          </p>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mt-4">
            Version 2.5.0 // Karachi, PK
          </p>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bg-accent/20 border border-bg-accent/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-accent-cyan/5">
          {categories.map((cat, i) => (
            <div key={i} className="skill-card bg-bg-primary/40 p-6 sm:p-8 md:p-10 group hover:bg-accent-cyan/[0.02] transition-all duration-500 border-r border-b border-bg-accent/20 last:border-r-0 relative overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between mb-6 sm:mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-accent-cyan mb-2 opacity-50 tracking-widest">MODULE_0{i + 1}</span>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent-cyan/5 rounded text-accent-cyan group-hover:scale-110 transition-transform duration-500">
                      {cat.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight">{cat.title}</h4>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl sm:text-2xl font-mono font-light text-accent-cyan/40 group-hover:text-accent-cyan transition-colors duration-500">
                    {cat.progress}%
                  </span>
                  <div className="text-[8px] font-mono text-text-secondary uppercase tracking-tighter opacity-40">Efficiency</div>
                </div>
              </div>

              {/* Progress Bar HUD style */}
              <div className="w-full h-1 bg-bg-accent/20 rounded-full mb-6 sm:mb-8 overflow-hidden relative">
                <div
                  className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-1000 ease-out relative"
                  style={{ width: `${cat.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, j) => (
                  <div
                    key={j}
                    className="px-3 py-1.5 bg-bg-secondary/50 border border-bg-accent/30 rounded text-[11px] font-mono text-text-secondary hover:border-accent-cyan/50 hover:text-accent-cyan transition-all duration-300 cursor-default flex items-center space-x-2 group/pill"
                  >
                    <div className="w-1 h-1 bg-accent-cyan/30 rounded-full group-hover/pill:bg-accent-cyan transition-colors" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .serif {
          font-family: 'Georgia', serif;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};
