// src/components/Hero.tsx
import React from 'react';
import CanvasAnimation from './CanvasAnimation';
import { ArrowRight } from 'lucide-react';
import logo from '../../assets/logo.svg';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Canvas Animation (z-index -1) */}
      <div className="absolute inset-0 -z-10">
        <CanvasAnimation />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <img src={logo} alt="frauvorragend logo" className="inline-block h-60" />
        <h2 className="font-opensans text-2xl md:text-3xl text-gray-700 mb-6">
          Kreative Lösungen für Grafik, Fotografie <br /> und Marketing – aus einer Hand.
        </h2>
        <p className="font-opensans text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Ich bin Andrea Siegenthaler Casparis, ansässig in Basel, und
          entwickle aus deinen Ideen dein Corporate Design, deine Website,
          Visitenkarten und Flyer – alles aus einer Hand. Ich freue mich
          darauf, dein nächstes Projekt zu gestalten und umzusetzen!
        </p>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full 
                     font-opensans text-lg transition-transform hover:scale-105"
        >
          Los geht’s
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
