import React from 'react';
import type { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  {
    title: 'RollUp Spitex',
    description: 'Beispielprojekt mit Fotos und kurzer Beschreibung.',
    imageUrl: '/assets/kachel_rollup.jpg'
  },
  {
    title: 'I LAUGH YOU! Broschüre',
    description: 'Kreative Gestaltung, kurze Beschreibung.',
    imageUrl: '/assets/kachel_ily.jpg'
  },
  {
    title: 'La Famiglia Flyer',
    description: 'Werbeflyer, kurzer Kontext.',
    imageUrl: '/assets/lafamiglia.jpg'
  },
  {
    title: 'nuniq Webdesign & Visitenkarte',
    description: 'Webauftritt + Geschäftsausstattung.',
    imageUrl: '/assets/nuniq.jpg'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-georgia text-4xl mb-8 text-center">Portfolio / Sneak Peek</h2>
        
        <p className="font-opensans text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
          „Ein kleiner Sneak Peek meiner bisherigen Arbeiten. Hier bekommst du einen Eindruck, wie ich Projekte in Szene setze und deine Idee mit frischem Design, Text und Fotografie zum Leben erwecke.“
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="font-georgia text-xl mb-2">{item.title}</h3>
                  <p className="font-opensans text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
