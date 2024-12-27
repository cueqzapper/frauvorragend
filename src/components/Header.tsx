// src/components/Header.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ifMobile, setIfMobile] = useState(false);
  const prevScrollY = useRef<number>(window.scrollY);

  // Handle window resize to set ifMobile
  useEffect(() => {
    const handleResize = () => {
      setIfMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initialize

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll to show/hide header on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && !isVisible) {
        // Scrolling down
        setIsVisible(true);
      } else if (currentScrollY < prevScrollY.current && isVisible) {
        // Scrolling up
        setIsVisible(false);
      }

      prevScrollY.current = currentScrollY;
    };

    if (ifMobile) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ifMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isVisible, ifMobile]);

  return (
    <header
      className={`fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm transition-transform duration-300 transform ${
        ifMobile ? (isVisible ? 'translate-y-0' : '-translate-y-full') : ''
      }`}
    >
      <nav className="container mx-auto px-6 pt-1 pb-2">
        <div className="flex justify-between items-center">
          <a href="#" className="text-3xl font-georgia text-coral">
            <img src={logo} alt="frauvorragend logo" className="h-16" />
          </a>
          
          <div className="hidden md:flex space-x-8">
            <NavLinks />
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <NavLinks mobile />
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const baseClasses = "font-opensans transition-colors duration-200";
  const classes = mobile
    ? `${baseClasses} block py-2`
    : `${baseClasses} hover:text-coral`;

  return (
    <div className={mobile ? "flex flex-col" : "flex space-x-8"}>
      <a href="#home" className={classes}>Home</a>
      <a href="#services" className={classes}>Services</a>
      <a href="#portfolio" className={classes}>Portfolio</a>
      <a href="#about" className={classes}>About</a>
      <a href="#contact" className={classes}>Contact</a>
    </div>
  );
};

export default Header;
