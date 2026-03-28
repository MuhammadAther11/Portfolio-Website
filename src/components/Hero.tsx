import React, { useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../lib/data';
import { Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-text", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.5");

    tl.from(".hero-photo", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.5");

    tl.from(".hero-cta-btn", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");

    tl.from(".hero-social-icon", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Typewriter effect
    let currentTitleIndex = 0;
    const updateTypewriter = () => {
      gsap.to(typewriterRef.current, {
        duration: 2,
        text: personalInfo.titles[currentTitleIndex],
        ease: "none",
        onComplete: () => {
          setTimeout(() => {
            currentTitleIndex = (currentTitleIndex + 1) % personalInfo.titles.length;
            updateTypewriter();
          }, 2000);
        }
      });
    };
    updateTypewriter();

    // GSAP Round Hover Animation
    const socialIcons = document.querySelectorAll('.hero-social-icon');
    socialIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotate: 360,
          backgroundColor: "#38bdf8",
          color: "#0f172a",
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          backgroundColor: "rgba(56, 189, 248, 0.1)",
          color: "#38bdf8",
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });

    // Floating particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1.5 h-1.5 bg-accent-cyan/15 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h2 className="hero-text text-lg sm:text-xl font-medium text-accent-cyan mb-3">Hi, I am Ather</h2>
          <h1 className="hero-text text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-3">
            <span className="text-gradient">{personalInfo.name}</span>
          </h1>
          <div className="hero-text h-6 sm:h-8 mb-6">
            <span ref={typewriterRef} className="text-lg sm:text-xl md:text-2xl font-semibold text-text-secondary"></span>
          </div>

          <div className="hero-text flex items-center justify-center lg:justify-start space-x-3 mb-6">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hero-social-icon w-10 h-10 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-icon w-10 h-10 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hero-social-icon w-10 h-10 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="hero-text flex flex-wrap justify-center lg:justify-start gap-3">
            <a href="#contact" className="hero-cta-btn px-6 py-2.5 bg-accent-cyan text-bg-primary font-bold rounded-full hover:bg-accent-glow transition-all duration-300 shadow-lg shadow-accent-cyan/20 text-sm sm:text-base">
              Let's Connect
            </a>
            <a href="#projects" className="hero-cta-btn px-6 py-2.5 border-2 border-accent-cyan text-accent-cyan font-bold rounded-full hover:bg-accent-cyan/10 transition-all duration-300 text-sm sm:text-base">
              View Projects
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center relative order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="hero-photo relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-accent-cyan shadow-2xl shadow-accent-cyan/30">
            <img
              src="/profile.png"
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* AI Brain SVG Animation (Subtle) */}
          <div className="absolute -z-10 opacity-20 animate-pulse">
            <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#38bdf8" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.7,85.2,-0.9C83.6,13.8,77.1,27.7,68.4,39.8C59.7,51.9,48.8,62.3,36.1,69.5C23.4,76.7,8.9,80.8,-5.4,80.1C-19.7,79.4,-33.8,73.9,-46.1,65.4C-58.4,56.9,-68.9,45.4,-75.8,32.2C-82.7,19.1,-86,4.3,-84.3,-10C-82.6,-24.3,-75.9,-38.1,-66.1,-49.4C-56.3,-60.7,-43.4,-69.5,-30.1,-76.8C-16.8,-84.1,-3.1,-89.9,11.3,-88.4C25.7,-86.9,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
