import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../lib/data';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!projects || projects.length === 0) return;

    // Set initial state to avoid flicker but ensure visibility if GSAP fails
    gsap.set(".project-card", { opacity: 0, y: 30 });

    gsap.to(".project-card", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef, dependencies: [projects] });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" ref={containerRef} className="py-16 sm:py-20 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-accent-cyan font-bold uppercase tracking-widest mb-2">Portfolio</h2>
          <h3 className="text-3xl sm:text-4xl font-bold">Featured Projects</h3>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card group bg-bg-secondary rounded-2xl overflow-hidden border-t-4 border-accent-cyan shadow-xl cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(56 189 248 / 0.2), 0 8px 10px -6px rgb(56 189 248 / 0.2)",
                  duration: 0.3,
                  ease: "power2.out"
                });
                gsap.to(e.currentTarget.querySelector('h4'), {
                  color: "#38bdf8",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  duration: 0.3,
                  ease: "power2.out"
                });
                gsap.to(e.currentTarget.querySelector('h4'), {
                  color: "white",
                  duration: 0.3
                });
              }}
            >
              <div className="p-6 sm:p-8">
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-accent-cyan transition-colors">{project.title}</h4>
                <p className="text-text-primary/70 text-sm mb-4 sm:mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-bg-accent/30 rounded text-accent-cyan">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <a href={project.github} className="p-2 bg-bg-accent/20 rounded-full hover:bg-accent-cyan hover:text-bg-primary transition-all duration-300">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.live} className="p-2 bg-bg-accent/20 rounded-full hover:bg-accent-cyan hover:text-bg-primary transition-all duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
