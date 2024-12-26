import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { ContactFormData } from '../types';

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you can add your submission logic (e.g., sending to an API).
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-georgia text-4xl mb-12 text-center text-gray-800">
          Lass uns loslegen!
        </h2>

        <p className="font-opensans text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
          Bereit für dein neues Projekt? Kontaktiere mich noch heute! Gemeinsam finden wir heraus, wie wir deine Vision perfekt umsetzen können.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-opensans text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-opensans text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-opensans text-gray-700 mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-coral text-white py-3 rounded-lg font-opensans
                           transition-transform hover:scale-105"
              >
                Nachricht senden
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-coral" />
              <div>
                <h3 className="font-georgia text-xl mb-2 text-gray-800">Adresse</h3>
                <p className="font-opensans text-gray-600">Basel, Schweiz</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-coral" />
              <div>
                <h3 className="font-georgia text-xl mb-2 text-gray-800">E-Mail</h3>
                <a
                  href="mailto:contact@frauvorragend.ch"
                  className="font-opensans text-gray-600 hover:text-coral"
                >
                  contact@frauvorragend.ch
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-coral" />
              <div>
                <h3 className="font-georgia text-xl mb-2 text-gray-800">Telefon</h3>
                <a
                  href="tel:+41000000000"
                  className="font-opensans text-gray-600 hover:text-coral"
                >
                  +41 00 000 00 00
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
