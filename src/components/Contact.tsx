import React from 'react';
import { motion } from 'motion/react';
import { ICONS } from '../assets/icons';

export function Contact() {
  const contactInfo = [
    {
      icon: ICONS.map_pin,
      title: 'Atelier',
      details: 'Arnhem, Nederland',
      subDetails: 'Precieze locatie op afspraak'
    },
    {
      icon: ICONS.phone,
      title: 'Telefoon',
      details: '+31 (0)6 12345678', // Placeholder
      subDetails: 'Bereikbaar op werkdagen'
    },
    {
      icon: ICONS.mail,
      title: 'E-mail',
      details: 'info@intuitivesoularts.nl',
      subDetails: 'Ik reageer meestal binnen 2 dagen'
    }
  ];

  return (
    <div className="bg-brand-cream/30 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-brand-orange/5 py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl mb-6 font-serif italic text-brand-dark">Laten we verbinden</h1>
          <p className="text-xl text-brand-dark/70 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Heb je een vraag over een workshop, wil je een kunstwerk in het echt zien of ben je benieuwd naar een samenwerking? Mijn deur staat altijd op een kier.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-brand-green/5 hover:border-brand-green/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 text-[#fff0c8] group-hover:scale-110 transition-transform opacity-60">
                  <item.icon size={160} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-medium text-brand-dark mb-2">{item.title}</h3>
                  <p className="font-serif text-brand-dark/90 text-lg mb-1">{item.details}</p>
                  <p className="text-sm text-brand-dark/50 italic">{item.subDetails}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-brand-dark p-8 rounded-3xl text-brand-cream shadow-xl"
            >
              <h3 className="text-xl mb-4 font-serif italic">Volg de creatieve reis</h3>
              <p className="text-brand-cream/60 text-sm mb-6 leading-relaxed">
                Op Instagram deel ik dagelijks reflecties, processen en beelden rechtstreeks uit het atelier.
              </p>
              <a 
                href="https://www.instagram.com/intuitivesoulcrafts" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-brand-orange font-medium hover:gap-4 transition-all"
              >
                <ICONS.instagram size={20} /> @intuitivesoulcrafts <span>&rarr;</span>
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[40px] shadow-xl p-8 md:p-12 border border-brand-green/5"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl">Stuur een bericht</h2>
              <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                <ICONS.message className="text-brand-green" size={20} />
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-dark/70 mb-2">Naam</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-cream/20 border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                    placeholder="Jouw naam"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark/70 mb-2">E-mailadres</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-cream/20 border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                    placeholder="naam@voorbeeld.nl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark/70 mb-2">Onderwerp</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-brand-cream/20 border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none transition-all appearance-none">
                  <option>Vraag over een workshop</option>
                  <option>Interesse in een kunstwerk</option>
                  <option>Samenwerking / Zakelijk</option>
                  <option>Iets anders...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark/70 mb-2">Jouw bericht</label>
                <textarea 
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-brand-cream/20 border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none transition-all resize-none"
                  placeholder="Wat wil je met me delen?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto px-12 py-5 bg-brand-green text-white rounded-2xl font-medium shadow-lg hover:bg-brand-green/90 hover:scale-[1.02] transition-all"
              >
                Versturen
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
