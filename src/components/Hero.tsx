import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-coral/20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-turquoise/20 animate-float-delayed" />
      </div>
      
      <div className="container mx-auto px-6 py-20">
        <h1 className="font-georgia text-5xl md:text-6xl lg:text-7xl mb-6">
          Hello and welcome to
          <span className="text-coral block">frauvorragend</span>
        </h1>
        
        <p className="font-opensans text-xl md:text-2xl text-gray-700 max-w-2xl mb-8">
          Empowering businesses through strategic consulting and comprehensive digital solutions.
          Let's transform your vision into reality.
        </p>

        <a
          href="#services"
          className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full 
                   font-opensans text-lg transition-transform hover:scale-105"
        >
          Let's Get Started
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;