/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onCtaClick: (target: string) => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-green/5">
      {/* Background artwork placeholder */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand-green" />
          <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand-orange" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl mb-6 tracking-tight leading-tight"
        >
          Intuitive Soul Arts
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-serif italic text-brand-dark/80 mb-10 max-w-2xl mx-auto"
        >
          Kunst, creativiteit en intuïtieve expressie van Anne Hopman
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => onCtaClick('workshops')}
            className="px-8 py-3 bg-brand-orange text-brand-cream rounded-full font-medium hover:bg-brand-orange/90 transition-all shadow-lg hover:shadow-brand-orange/20"
          >
            Bekijk Workshops
          </button>
          <button 
            onClick={() => onCtaClick('gallery')}
            className="px-8 py-3 bg-brand-green text-brand-cream rounded-full font-medium hover:bg-brand-green/90 transition-all shadow-lg hover:shadow-brand-green/20"
          >
            Bekijk Galerie
          </button>
        </motion.div>
      </div>
    </section>
  );
}
