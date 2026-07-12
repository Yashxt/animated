import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "01 // WORK", href: "#work" },
    { label: "02 // EXPERIENCE", href: "#experience" },
    { label: "03 // SKILLS", href: "#skills" },
    { label: "04 // PROJECTS", href: "#projects" },
    { label: "05 // INFO", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80; // height of header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#030305]/75 backdrop-blur-md border-white/[0.06] py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#"
            className="group flex items-center gap-2 font-display text-sm tracking-[0.3em] font-medium text-white transition-opacity hover:opacity-80"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            MATVEYAN<span className="text-[#10b981] font-bold">.</span>STUDIO
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-[10px] tracking-wider text-white/50 hover:text-white transition-all duration-300 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#10b981] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Socials & CTA (Desktop) */}
          <div id="nav-actions-desktop" className="hidden lg:flex items-center gap-5 border-l border-white/10 pl-6">
            <a
              id="social-link-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="social-link-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="social-link-twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors"
              aria-label="Twitter profile"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              id="nav-cta-button"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative overflow-hidden group flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[#10b981] border border-[#10b981]/30 bg-[#10b981]/5 px-3 py-1.5 rounded-sm hover:bg-[#10b981]/15 transition-all duration-300 ml-2"
            >
              INITIATE_COMMS
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Toggle mobile navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (with Backdrop Blur and Cinematic Depth) */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-30 transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          id="mobile-drawer-backdrop"
          className="absolute inset-0 bg-[#030305]/90 backdrop-blur-lg" 
          onClick={() => setIsOpen(false)}
        />

        {/* Navigation Content */}
        <div id="mobile-drawer-content" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-8 flex flex-col gap-8 text-center items-center">
          <div className="w-8 h-[1px] bg-[#10b981]/40 mb-2" />
          
          <nav className="flex flex-col gap-6 w-full">
            {menuItems.map((item, idx) => (
              <a
                key={item.label}
                id={`mobile-nav-link-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-display text-lg tracking-[0.2em] font-medium text-white/60 hover:text-white hover:scale-105 transition-all duration-300 py-1"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="w-8 h-[1px] bg-[#10b981]/40 my-4" />

          {/* Social icons for mobile */}
          <div className="flex items-center gap-6">
            <a
              id="mobile-social-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors p-2 border border-white/5 rounded-full bg-white/[0.01]"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="mobile-social-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors p-2 border border-white/5 rounded-full bg-white/[0.01]"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="mobile-social-twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#10b981] transition-colors p-2 border border-white/5 rounded-full bg-white/[0.01]"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <a
            id="mobile-drawer-cta"
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="w-full flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest text-[#10b981] border border-[#10b981]/30 bg-[#10b981]/5 py-3 rounded-sm hover:bg-[#10b981]/15 transition-all duration-300 mt-4"
          >
            INITIATE_COMMS
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  );
}
