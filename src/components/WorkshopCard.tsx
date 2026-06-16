/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Workshop } from '../types';
import { BulletPointIcon } from './icons/BulletPointIcon';

export interface WorkshopCardProps {
  workshop: Workshop;
  onSelect: (id: string) => void;
}

export function WorkshopCard({ workshop, onSelect }: WorkshopCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-brand-cream border border-brand-green/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full uppercase tracking-wider">
            {workshop.category}
          </span>
          <span className="text-brand-orange font-serif font-bold text-xl">{workshop.price}</span>
        </div>

        <h3 className="text-2xl font-serif mb-2">{workshop.title}</h3>
        <p className="text-brand-dark/70 text-sm mb-6 flex-grow">{workshop.description}</p>
        
        <div className="space-y-2 mb-6 text-sm text-brand-dark/60">
          <div className="flex items-center gap-2">
            <BulletPointIcon size={14} className="text-brand-orange" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <BulletPointIcon size={14} className="text-brand-orange" />
            <span>{workshop.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <BulletPointIcon size={14} className="text-brand-orange" />
            <span>Max. {workshop.spots} deelnemers</span>
          </div>
        </div>

        <button 
          onClick={() => onSelect(workshop.id)}
          className="w-full py-3 border border-brand-orange text-brand-orange rounded-xl font-medium hover:bg-brand-orange hover:text-brand-cream transition-colors"
        >
          Inschrijven
        </button>
      </div>
    </motion.div>
  );
}
