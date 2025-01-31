import React from 'react';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div>
            <img
              src="https://storage.googleapis.com/pi3/wallpapers/12-7_Wide-Medium_Woman-1/2024-05-30-140058_0-large.jpg"
              alt="Andrea Siegenthaler Casparis"
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          
          {/* Text Section */}
          <div>
            <h2 className="font-georgia text-4xl mb-6 text-gray-800">
              Wer steckt hinter <span className="text-coral">frau<strong>vor</strong>ragend</span>?
            </h2>
            <p className="font-opensans text-gray-700 leading-relaxed mb-6">
            Ich bin Andrea Siegenthaler aus Basel und seit 2021 als Freelancerin im Bereich Grafikdesign und Fotografie tätig. Schon als Kind habe ich leidenschaftlich gerne fotografiert, geschrieben und digital gezeichnet und gestaltet.
            </p>
            <p className="font-opensans text-gray-700 leading-relaxed mb-6">
            Heute ist es meine Leidenschaft, gemeinsam mit meinen Kundinnen und Kunden Projekte von Grund auf zu planen und ihre Ideen ins Web oder aufs Papier zu bringen. Dabei ist mir der persönliche Austausch besonders wichtig – ich finde heraus, was du wirklich willst, und mache daraus dein individuelles Ergebnis.
            </p>
            <p className="font-opensans text-gray-700 leading-relaxed mb-6">
            Als vielseitige Kreative übernehme ich das Design, das Branding, das Fotografieren und das Schreiben. Ich berate dich gerne dabei, welche Investition für dich und deine Idee sinnvoll ist. Von Planung und Design bis zur Ausarbeitung: Ich bin dein zuverlässiger Ansprechpartner und begleite dich mit Freude bei der Umsetzung deiner Ideen!
            </p>
            
            {/* Call to Action */}
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4
                       rounded-full font-opensans transition-transform hover:scale-105"
            >
              Lerne mich kennen
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
