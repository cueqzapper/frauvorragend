import React from 'react';
import { Users, Network, Laptop } from 'lucide-react';
import type { Service } from '../types';

const services: Service[] = [
  {
    title: 'Personal Consulting',
    description: 'Tailored guidance and strategic planning to help you achieve your business goals.',
    icon: 'Users'
  },
  {
    title: 'Versatile & Well-Connected',
    description: 'Access to a broad network of professionals and resources to support your growth.',
    icon: 'Network'
  },
  {
    title: 'Comprehensive Digital Solutions',
    description: 'End-to-end digital transformation and implementation services.',
    icon: 'Laptop'
  }
];

const Services = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-12 h-12" />;
      case 'Network': return <Network className="w-12 h-12" />;
      case 'Laptop': return <Laptop className="w-12 h-12" />;
      default: return null;
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="font-georgia text-4xl mb-12 text-center">Our Services</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow
                         border border-gray-100 group"
            >
              <div className="text-coral group-hover:text-turquoise transition-colors">
                {getIcon(service.icon)}
              </div>
              <h3 className="font-georgia text-xl mt-4 mb-2">{service.title}</h3>
              <p className="font-opensans text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;