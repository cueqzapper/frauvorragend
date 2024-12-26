import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-3xl font-georgia text-coral">
            frauvorragend
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