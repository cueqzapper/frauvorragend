import React from 'react';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80"
              alt="Andrea Siegenthaler Casparis"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="font-georgia text-4xl mb-6">About Me</h2>
            <p className="font-opensans text-gray-700 mb-6">
              As a seasoned consultant based in Basel, Switzerland, I bring years of experience
              in digital transformation and business strategy. My approach combines technical
              expertise with a deep understanding of business needs, ensuring that every
              solution is both innovative and practical.
            </p>
            <p className="font-opensans text-gray-700 mb-8">
              With a strong network of professionals and a passion for digital excellence,
              I help businesses navigate the complexities of modern technology while
              maintaining a personal touch in every interaction.
            </p>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-turquoise text-white px-8 py-4
                       rounded-full font-opensans transition-transform hover:scale-105"
            >
              Let's Connect
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;