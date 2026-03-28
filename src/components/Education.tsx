import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { education } from '../lib/data';
import { GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".timeline-item", {
      x: -60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="education" ref={containerRef} className="py-16 sm:py-20 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-accent-cyan font-bold uppercase tracking-widest mb-2">Journey</h2>
          <h3 className="text-3xl sm:text-4xl font-bold">Education & Certificates</h3>
        </div>

        <div className="timeline-container relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-bg-accent -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {education.map((item, i) => (
              <div key={i} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-bg-secondary border-4 border-accent-cyan rounded-full -translate-x-1/2 z-10 flex items-center justify-center">
                  {item.type === 'education' ? <GraduationCap className="w-3 h-3 text-accent-cyan" /> : <Award className="w-3 h-3 text-accent-cyan" />}
                </div>

                {/* Content */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="bg-bg-primary p-5 sm:p-6 rounded-2xl border border-bg-accent shadow-lg hover:glow-border transition-all duration-300">
                    <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest">{item.period}</span>
                    <h4 className="text-lg sm:text-xl font-bold mt-1 mb-2">{item.institution}</h4>
                    <p className="text-text-primary/70 text-sm">{item.degree}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
