/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkshopCard } from './components/WorkshopCard';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { auth } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useWorkshops, useGallery, useTestimonials } from './hooks';
import { ICONS } from './assets/icons';

function HomeContent() {
  const navigate = useNavigate();
  const { workshops, loading: wLoading } = useWorkshops(true);
  const { items: galleryItems, loading: gLoading } = useGallery();
  const { testimonials, loading: tLoading } = useTestimonials();

  // Fallback to static data if loading or empty for better initial experience
  // In a real app we might want to seed once.
  
  const featuredGallery = galleryItems.slice(0, 3);
  const featuredWorkshops = workshops.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      <Hero onCtaClick={(page) => navigate(`/${page === 'home' ? '' : page}`)} />

      {/* About Anne Teaser */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-xl"
        >
          <img 
            src="https://www.burobroccoli.nl/wp-content/uploads/2022/10/IMG-6805_Lang.jpg" 
            alt="Anne Hopman" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-6">Over Anne</h2>
          <p className="text-lg text-brand-dark/80 mb-8 leading-relaxed font-serif italic">
            "Ik ben Anne Hopman, kunstenaar, intuïtief maker en onderzoeker van de wereld achter wat zichtbaar is. Al sinds mijn studie Autonome Beeldende Kunst word ik geïnspireerd door bewustzijn, natuur en de diepere verbinding tussen mens en universum."
          </p>
          <button 
            onClick={() => navigate('/about')}
            className="text-brand-orange font-medium flex items-center gap-2 hover:gap-3 transition-all underline decoration-brand-orange/20 underline-offset-8"
          >
            Mijn volledige verhaal <span>&rarr;</span>
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
              onClick={() => navigate('/workshops')}
              className="text-brand-green font-medium hidden sm:block"
            >
              Alle workshops bekijken &rarr;
            </button>
          </div>
          
          {wLoading ? (
            <div className="flex justify-center py-12"><ICONS.loader className="text-brand-green" /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {featuredWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} onSelect={() => navigate('/contact')} />
              ))}
              {featuredWorkshops.length === 0 && (
                <p className="col-span-full text-center text-brand-dark/40 py-12">Er zijn momenteel geen geplande workshops.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl mb-12 text-center">Galerie</h2>
        {gLoading ? (
          <div className="flex justify-center py-12"><ICONS.loader className="text-brand-green" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {featuredGallery.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => navigate('/gallery')}
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
            {featuredGallery.length === 0 && (
              <p className="col-span-full text-center text-brand-dark/40 py-12">De galerie wordt binnenkort aangevuld.</p>
            )}
          </div>
        )}
        <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/gallery')}
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
          {tLoading ? (
            <div className="flex justify-center py-12"><ICONS.loader className="text-brand-green" /></div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {testimonials.map((t) => (
                <div key={t.id} className="relative">
                  <div className="text-6xl text-brand-orange/20 absolute -top-8 left-1/2 -translate-x-1/2 font-serif font-black">&ldquo;</div>
                  <p className="text-xl text-brand-dark/80 relative z-10 font-serif leading-relaxed italic mb-6">
                    {t.text}
                  </p>
                  <div className="font-semibold text-brand-orange">— {t.name}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-16 aspect-video bg-brand-dark/5 rounded-3xl flex items-center justify-center text-brand-dark/40 font-serif italic shadow-inner">
            Video testimonials komen hier
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><ICONS.loader /></div>;

  return user ? <AdminDashboard /> : <AdminLogin />;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center min-h-[60vh] flex flex-col justify-center">
      <h2 className="text-5xl mb-6">{title}</h2>
      <p className="text-xl text-brand-dark/60 font-serif italic mb-8">
        Deze pagina wordt momenteel vormgegeven met liefde en aandacht.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="text-brand-orange font-medium"
      >
        &larr; Terug naar Home
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  
  // Custom navigation handler for Header component
  const handleNavigate = (page: string) => {
    navigate(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {!isAdmin && <Header onNavigate={handleNavigate} currentPage={currentPage} />}
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HomeContent /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/workshops" element={<PageWrapper><PlaceholderPage title="Workshops" /></PageWrapper>} />
            <Route path="/agenda" element={<PageWrapper><PlaceholderPage title="Agenda" /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><PlaceholderPage title="Galerie" /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
            {/* Catch-all route to redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && (
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
                <a 
                  href="https://www.instagram.com/intuitivesoulcrafts" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all cursor-pointer"
                  title="Instagram"
                >
                  <ICONS.instagram size={20} />
                </a>
                <div 
                  className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all cursor-pointer opacity-50"
                  title="LinkedIn (Binnenkort)"
                >
                  <ICONS.linkedin size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-brand-cream/10 text-xs flex justify-between">
            <span>&copy; 2025 Intuitive Soul Arts — Anne Hopman</span>
            <span onClick={() => navigate('/admin')} className="cursor-pointer opacity-20 hover:opacity-100">Beheer</span>
          </div>
        </footer>
      )}
    </div>
  );
}
