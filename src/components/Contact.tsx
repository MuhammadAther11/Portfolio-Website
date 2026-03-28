import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../lib/data';
import { Mail, Linkedin, MapPin, Send, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mailto = `mailto:${personalInfo.email}?subject=Hello%20Ather&body=Hi%20Ather,%0D%0A%0D%0AI%20am%20reaching%20out%20from%20your%20portfolio%20website.%0D%0A`;

  useGSAP(() => {
    gsap.to(".glow-circle", {
      scale: 1.2,
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 1,
      ease: "sine.inOut"
    });

    // GSAP Round Hover Animation
    const socialIcons = document.querySelectorAll('.social-icon-round');
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
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-16 sm:py-20 bg-bg-primary relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-circle absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-accent-cyan/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="glow-circle absolute top-1/2 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-accent-glow/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-accent-cyan font-bold uppercase tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-gradient">Let's Create Something Amazing</h3>

          <div className="bg-bg-secondary p-6 sm:p-10 md:p-12 lg:p-16 rounded-3xl border border-bg-accent shadow-2xl glow-hover transition-all duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="flex flex-col items-center">
                <div className="social-icon-round w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan mb-4 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-text-primary/60 mb-1">Email</span>
                <a href={mailto} className="text-sm font-bold hover:text-accent-cyan transition-colors">{personalInfo.email}</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="social-icon-round w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan mb-4 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-text-primary/60 mb-1">LinkedIn</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-accent-cyan transition-colors">Ather Ali</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="social-icon-round w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan mb-4 transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-text-primary/60 mb-1">GitHub</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-accent-cyan transition-colors">MuhammadAther11</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="social-icon-round w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center text-accent-cyan mb-4 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-text-primary/60 mb-1">Location</span>
                <span className="text-sm font-bold">{personalInfo.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href={mailto}
                className="flex items-center justify-center space-x-2 px-8 py-3 bg-accent-cyan text-bg-primary font-bold rounded-full hover:bg-accent-glow transition-all duration-300"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-8 py-3 border-2 border-accent-cyan text-accent-cyan font-bold rounded-full hover:bg-accent-cyan/10 transition-all duration-300"
              >
                <span>LinkedIn Profile</span>
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 sm:mt-16 text-center text-text-primary/40 text-sm">
        <p>Built with React + GSAP ⚡ by {personalInfo.name}</p>
        <p className="mt-2">© 2026 All Rights Reserved</p>
      </footer>
    </section>
  );
};
