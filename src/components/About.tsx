import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    gsap.from(".about-content", {
      x: -80,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    gsap.from(".about-card", {
      x: 80,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0');
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="about-section py-16 sm:py-20 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="about-content">
            <h2 className="text-accent-cyan font-bold uppercase tracking-widest mb-2">About Me</h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-5">Building the Future with <span className="text-accent-cyan">Code & AI</span></h3>
            <p className="text-base sm:text-lg text-text-primary/80 leading-relaxed mb-6">
              {personalInfo.summary.split(' ').map((word, i) => {
                const highlights = ["React.js", "Next.js", "Agentic", "AI", "LLM"];
                const isHighlight = highlights.some(h => word.includes(h));
                return (
                  <span key={i} className={isHighlight ? "text-accent-cyan font-semibold" : ""}>
                    {word}{' '}
                  </span>
                );
              })}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Years Learning", value: 2 },
                { label: "Projects Built", value: 15 },
                { label: "Technologies", value: 12 },
                { label: "Certificates", value: 5 },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-accent-cyan mb-1">
                    <span className="stat-number" data-target={stat.value}>0</span>+
                  </div>
                  <div className="text-xs uppercase tracking-wider text-text-primary/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-card relative">
            <div className="bg-bg-secondary p-6 sm:p-8 rounded-2xl border border-bg-accent shadow-xl relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-accent-cyan rounded-full animate-ping" />
                </div>
                <div>
                  <h4 className="font-bold">Currently Focused On</h4>
                  <p className="text-sm text-text-primary/60">Agentic AI Workflows</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan w-[85%]" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frontend Development</span>
                  <span className="text-accent-cyan">85%</span>
                </div>
                <div className="h-2 w-full bg-bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan w-[70%]" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>AI Agent Integration</span>
                  <span className="text-accent-cyan">70%</span>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-4 border-r-4 border-accent-cyan rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-4 border-l-4 border-accent-cyan rounded-bl-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
