import React from 'react';
import { motion } from 'motion/react';
import { ICONS } from '../assets/icons';

export function About() {
  const photoUrl = "https://www.burobroccoli.nl/wp-content/uploads/2022/10/IMG-6805_Lang.jpg";

  return (
    <div className="bg-brand-cream/30 min-h-screen">
      {/* Hero / Header Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={photoUrl} 
          alt="Anne Hopman" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-serif italic text-brand-dark"
            >
              Over Anne
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Main Bio Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8 text-xl text-brand-dark/80 leading-relaxed font-serif"
          >
            <p className="text-2xl text-brand-dark font-medium not-italic leading-snug">
              Ik ben Anne Hopman, kunstenaar, intuïtief maker en onderzoeker van de wereld achter wat zichtbaar is.
            </p>
            
            <p>
              Al sinds mijn studie Autonome Beeldende Kunst aan de kunstacademie in Utrecht word ik geïnspireerd door bewustzijn, energie, natuur en de diepere verbinding tussen mens en universum. Wat mij fascineert zijn de verhalen, gevoelens en lagen die zich niet altijd laten uitleggen, maar wel ervaren kunnen worden.
            </p>

            <p>
              Mijn werk ontstaat vanuit intuïtie. Het is een dialoog tussen binnen- en buitenwereld, tussen het zichtbare en het onzichtbare. Kleuren, vormen en symboliek helpen mij uitdrukking te geven aan wat zich aandient in het moment.
            </p>

            <p>
              Natuur speelt hierin een belangrijke rol. De ritmes van de seizoenen, de kracht van water, de schoonheid van imperfectie en de intelligentie van het natuurlijke leven vormen een voortdurende bron van inspiratie.
            </p>

            <p className="pt-8 border-t border-brand-green/10">
              Met Studio Intuitive Arts creëer ik werk dat uitnodigt tot verstilling, verwondering en verbinding. Kunst als herinnering aan wat we diep van binnen al weten.
            </p>
          </motion.div>

          {/* Sidebar / Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="bg-white p-12 rounded-[40px] shadow-xl border border-brand-green/5">
              <h3 className="text-2xl font-serif mb-8 italic">Mijn Essentie</h3>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <ICONS.palette size={20} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Intuïtieve Kracht</h4>
                    <p className="text-sm text-brand-dark/60 italic">Geen vastomlijnd plan, maar luisteren naar wat er wil ontstaan.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center shrink-0">
                    <ICONS.leaf size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Natuurlijke Flow</h4>
                    <p className="text-sm text-brand-dark/60 italic">Geïnspireerd door de organische vormen en ritmes van de aarde.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <ICONS.sparkles size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Stilte & Verbinding</h4>
                    <p className="text-sm text-brand-dark/60 italic">Ruimte creëren voor bewustzijn en innerlijke rust.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="aspect-square bg-brand-orange/10 rounded-[60px] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="relative z-10">
                <ICONS.heart className="text-brand-orange mb-4 mx-auto" size={48} fill="currentColor" opacity="0.2" />
                <h3 className="text-2xl font-serif mb-4">Wil je samen creëren?</h3>
                <p className="text-brand-dark/60 mb-8">Ik ontmoet je graag in mijn atelier voor een workshop of gesprek.</p>
                <a 
                  href="/contact" 
                  className="inline-block px-8 py-3 bg-brand-dark text-brand-cream rounded-full hover:bg-brand-orange transition-all"
                >
                  Neem contact op
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
