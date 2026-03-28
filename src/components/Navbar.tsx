import React, { useState, useEffect } from 'react';
import { Menu, X, Clock } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-bg-primary/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Side - Logo & Clock */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#home" className="text-xl sm:text-2xl font-bold text-accent-cyan">
            MA<span className="text-text-primary">.</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary/50 border border-border-primary">
            <Clock className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs sm:text-sm font-mono text-text-secondary">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-accent-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-3 sm:space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-primary hover:text-accent-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-bg-secondary shadow-xl transition-all duration-300 overflow-hidden lg:hidden",
        isOpen ? "max-h-96 py-6" : "max-h-0"
      )}>
        <div className="flex flex-col items-center space-y-4">
          {/* Mobile Clock */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary/50 border border-border-primary">
            <Clock className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-text-secondary">
              {formatTime(currentTime)}
            </span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-accent-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
