/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BulletPointIcon } from './icons/BulletPointIcon';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Over Anne', id: 'about' },
    { label: 'Workshops', id: 'workshops' },
    { label: 'Agenda', id: 'agenda' },
    { label: 'Galerie', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-green/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <img 
            src="assets/images/logo.webp" 
            alt="Intuitive Soul Arts Logo" 
            className="h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
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

        <button 
          onClick={() => onNavigate('contact')}
          className="md:hidden text-brand-orange"
        >
          <BulletPointIcon size={24} />
        </button>
      </div>
    </header>
  );
}
