import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-georgia text-4xl mb-12 text-center text-gray-800">
          Lass uns loslegen!
        </h2>

        <p className="font-opensans text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
          Bereit für dein neues Projekt? Kontaktiere mich noch heute! Gemeinsam finden wir heraus, wie wir deine Vision perfekt umsetzen können.
        </p>

        <div className="grid items-center justify-center">
        <div className="grid md:grid-cols-[400px_auto] gap-12">       
          {/* Contact Form */}
          <div className="w-[400px]">
            <form
              name="contact" // Name your form for Netlify Forms
              method="POST"
              data-netlify="true" // Enable Netlify Forms using data attribute
              data-netlify-honeypot="bot-field" // Honeypot field for spam filtering
              className="space-y-6"
              action="/success" // Redirect to a custom success page after submission
            >
              {/* Honeypot field */}
              <p className="hidden">
                <label>
                  Don’t fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              {/* Hidden form-name input */}
              <input type="hidden" name="form-name" value="contact" />

              <div>
                <label htmlFor="name" className="block font-opensans text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  name="email"
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
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral focus:border-transparent"
                  required
                ></textarea>
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

          
          <div className="inline-flex flex-col items-start justify-center space-y-8 h-full">
              {/* Contact Information */}
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-coral" />
                <div>
                  <h3 className="font-georgia text-xl mb-2 text-gray-800">Adresse</h3>
                  <p className="font-opensans text-gray-600">Basel, Schweiz</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
            </div>
            
          </div>




        </div>
      </div>
    </section>
  );
};

export default Contact;
