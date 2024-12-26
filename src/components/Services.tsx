import React from 'react';
import { Users, Network, Laptop } from 'lucide-react';
import type { Service } from '../types';

const services: Service[] = [
  {
    title: 'Persönliche & engagierte Beratung',
    description:
      'Dein persönlicher Kontakt für Planung, Design und Ausarbeitung. Bei mir bekommst du maßgeschneiderte Lösungen, die auf deine Bedürfnisse zugeschnitten sind. Kundenzentriert, kreativ und innovativ.',
    icon: 'Users',
  },
  {
    title: 'Vielseitig & vernetzt',
    description:
      'Vielseitigkeit ist meine Stärke. Vieles ist möglich, und wenn nicht, habe ich die richtigen Kontakte. Deine Projekte profitieren von meinem breiten Angebot und meinem Netzwerk – auch für unkonventionelle Ideen.',
    icon: 'Network',
  },
  {
    title: 'Digitale Komplettlösung',
    description:
      'Komplette Lösungen für Grafikdesign und Marketing. Von der Planung über das Design bis zur Umsetzung – alles aus einer Hand. Ideal für Einzelpersonen und kleine Unternehmen, die einen zuverlässigen Ansprechpartner suchen.',
    icon: 'Laptop',
  },
];

const examples = [
  'Corporate Design',
  'Flyer, Plakate, Roll-ups',
  'Webdesign',
  'Fotografie',
  'Texterstellung',
];

const Services = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-12 h-12 text-coral" />;
      case 'Network':
        return <Network className="w-12 h-12 text-turquoise" />;
      case 'Laptop':
        return <Laptop className="w-12 h-12 text-coral" />;
      default:
        return null;
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="font-georgia text-4xl mb-12 text-center text-gray-900">
          Was ich für dich tun kann
        </h2>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow
                         border border-gray-100 group"
            >
              {/* Icon */}
              <div className="mb-4">
                {getIcon(service.icon)}
              </div>
              {/* Service Title */}
              <h3 className="font-georgia text-xl mt-4 mb-2 text-gray-800">
                {service.title}
              </h3>
              {/* Service Description */}
              <p className="font-opensans text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Examples Section */}
        <div className="mt-16">
          <h3 className="font-georgia text-2xl mb-6 text-center text-gray-900">
            Beispiele
          </h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {examples.map((example, index) => (
              <li
                key={index}
                className="bg-coral/10 text-coral px-4 py-2 rounded-full font-opensans text-sm"
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
