/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkshopCard } from './components/WorkshopCard';
import { WORKSHOPS, GALLERY_ITEMS, TESTIMONIALS } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHome = () => (
    <div className="space-y-24 pb-24">
      <Hero onCtaClick={handleNavigate} />

      {/* About Anne Teaser */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-brand-green/20"
        >
          {/* Placeholder for Anne's photo */}
          <div className="absolute inset-0 flex items-center justify-center text-brand-green/50 font-serif italic text-xl">
            Foto van Anne Hopman
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-6">Over Anne</h2>
          <p className="text-lg text-brand-dark/80 mb-8 leading-relaxed">
            Als kunstenaar en workshopleider help ik mensen om weer in contact te komen met hun eigen creatieve bron. Bij Intuitive Soul Arts draait het niet om het eindresultaat, maar om de weg ernaartoe: het proces van luisteren naar je intuïtie en dat vormgeven op papier of doek.
          </p>
          <button 
            onClick={() => handleNavigate('about')}
            className="text-brand-orange font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            Lees meer over mijn reis <span>&rarr;</span>
          </button>
        </motion.div>
      </section>

      {/* Featured Workshops */}
      <section className="bg-brand-green/5 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl mb-2">Workshops</h2>
              <p className="text-brand-dark/60 font-serif italic">Schuif aan in het atelier</p>
            </div>
            <button 
              onClick={() => handleNavigate('workshops')}
              className="text-brand-green font-medium hidden sm:block"
            >
              Alle workshops bekijken &rarr;
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {WORKSHOPS.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} onSelect={() => handleNavigate('contact')} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl mb-12 text-center">Galerie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleNavigate('gallery')}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="text-brand-cream/80 text-xs uppercase tracking-widest mb-2">{item.category}</span>
                <h4 className="text-brand-cream text-lg font-serif">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <button 
              onClick={() => handleNavigate('gallery')}
              className="px-8 py-3 border border-brand-dark/20 rounded-full hover:bg-brand-dark hover:text-brand-cream transition-colors"
            >
              Volledige Galerie
            </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-orange/5 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-16 italic font-serif">Ervaringen van anderen</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="relative">
                <div className="text-6xl text-brand-orange/20 absolute -top-8 left-1/2 -translate-x-1/2 font-serif font-black">&ldquo;</div>
                <p className="text-xl text-brand-dark/80 relative z-10 font-serif leading-relaxed italic mb-6">
                  {t.text}
                </p>
                <div className="font-semibold text-brand-orange">— {t.name}</div>
              </div>
            ))}
          </div>
          {/* Optional video placeholder */}
          <div className="mt-16 aspect-video bg-brand-dark/5 rounded-3xl flex items-center justify-center text-brand-dark/40 font-serif italic shadow-inner">
            Video testimonials komen hier
          </div>
        </div>
      </section>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center min-h-[60vh] flex flex-col justify-center">
      <h2 className="text-5xl mb-6">{title}</h2>
      <p className="text-xl text-brand-dark/60 font-serif italic mb-8">
        Deze pagina wordt momenteel vormgegeven met liefde en aandacht.
      </p>
      <button 
        onClick={() => handleNavigate('home')}
        className="text-brand-orange font-medium"
      >
        &larr; Terug naar Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && renderHome()}
            {currentPage === 'about' && renderPlaceholder('Over Anne')}
            {currentPage === 'workshops' && renderPlaceholder('Workshops')}
            {currentPage === 'agenda' && renderPlaceholder('Agenda')}
            {currentPage === 'gallery' && renderPlaceholder('Galerie')}
            {currentPage === 'contact' && renderPlaceholder('Contact')}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-brand-dark text-brand-cream/80 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl text-brand-cream mb-6">Intuitive Soul Arts</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Een plek voor expressie, verbinding en creatieve groei onder begeleiding van Anne Hopman.
            </p>
          </div>
          <div>
            <h4 className="text-brand-cream font-medium mb-6">Navigatie</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-brand-orange cursor-pointer" onClick={() => handleNavigate('workshops')}>Workshops</li>
              <li className="hover:text-brand-orange cursor-pointer" onClick={() => handleNavigate('gallery')}>Galerie</li>
              <li className="hover:text-brand-orange cursor-pointer" onClick={() => handleNavigate('about')}>Over Anne</li>
              <li className="hover:text-brand-orange cursor-pointer" onClick={() => handleNavigate('contact')}>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-cream font-medium mb-6">Contact</h4>
            <p className="text-sm mb-4">E-mail: info@intuitivesoularts.nl</p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all cursor-pointer">
                In
              </div>
              <div className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all cursor-pointer">
                Ig
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 text-xs flex justify-between">
          <span>&copy; 2025 Intuitive Soul Arts — Anne Hopman</span>
          <span>Ontwerp & Realisatie</span>
        </div>
      </footer>
    </div>
  );
}
