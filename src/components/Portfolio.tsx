import React from 'react';
import type { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  {
    title: 'RollUp Spitex',
    description: 'Konzeption und Gestaltung zweier Roll-ups im bestehenden Corporate Design, inklusive Copywriting und Fotoshooting.',
    imageUrl: '/assets/kachel_rollup.jpg'
  },
  {
    title: 'Broschüre, Kunstprojekt I LAUGH YOU!',
    description: 'Design und Textentwicklung einer Broschüre für das Kunstprojekt I LAUGH YOU!',
    imageUrl: '/assets/kachel_ily.jpg'
  },
  {
    title: 'Werbeflyer, La Famiglia Fluhberg',
    description: 'Gestaltung eines Werbeflyers für das Familienunternehmen La Famiglia Fluhberg.',
    imageUrl: '/assets/lafamiglia.jpg'
  },
  {
    title: 'Webseite und Geschäftsausstattung, nuniq',
    description: 'Entwicklung des Corporate Designs für nuniq, inklusive Umsetzung der Webseite, Briefkopf und Visitenkarten.',
    imageUrl: '/assets/nuniq.jpg'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-georgia text-4xl mb-8 text-center">Portfolio / Sneak Peek</h2>
        
        <p className="font-opensans text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
          „Ein kleiner Sneak Peek meiner bisherigen Arbeiten. Hier bekommst du einen Eindruck davon, wie ich Projekte in Szene setze und deine Idee mit frischem Design, Text und Fotografie zum Leben erwecke.“
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
