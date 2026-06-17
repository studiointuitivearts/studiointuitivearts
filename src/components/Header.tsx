/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Over Anne', id: 'about' },
    { label: 'Workshops', id: 'workshops' },
    { label: 'Agenda', id: 'agenda' },
    { label: 'Galerie', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-green/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <img 
            src="assets/images/logo.webp" 
            alt="Intuitive Soul Arts Logo" 
            className="h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id 
                  ? 'text-brand-orange' 
                  : 'text-brand-dark/70 hover:text-brand-orange'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-brand-dark p-2"
          aria-label="Menu openen"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-brand-green/10 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xl font-medium py-4 border-b border-brand-green/5 last:border-0 transition-colors ${
                    currentPage === item.id 
                      ? 'text-brand-orange' 
                      : 'text-brand-dark/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
