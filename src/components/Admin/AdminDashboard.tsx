import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  Settings,
  PlusCircle,
  Archive,
  ChevronRight
} from 'lucide-react';
import { WorkshopManager } from './WorkshopManager';
import { GalleryManager } from './GalleryManager';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'workshops' | 'gallery'>('overview');

  const handleLogout = () => signOut(auth);

  const menuItems = [
    { id: 'overview', label: 'Overzicht', icon: LayoutDashboard },
    { id: 'workshops', label: 'Workshops', icon: Calendar },
    { id: 'gallery', label: 'Galerie', icon: ImageIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-8">
        <div>
          <h2 className="text-2xl font-serif mb-6">Beheer</h2>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-brand-green text-white shadow-md' 
                    : 'text-brand-dark/60 hover:bg-brand-green/10'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-brand-green/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <header className="mb-12">
              <h1 className="text-4xl mb-4">Welkom Anne</h1>
              <p className="text-brand-dark/60 italic font-serif">Beheer hier je workshops en galerie items.</p>
            </header>

            <div className="grid sm:grid-cols-2 gap-6">
              <div 
                onClick={() => setActiveTab('workshops')}
                className="bg-brand-cream p-8 rounded-3xl border border-brand-green/10 cursor-pointer hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="text-blue-600" />
                </div>
                <h3 className="text-xl mb-2">Workshops beheren</h3>
                <p className="text-sm text-brand-dark/60 mb-6">Voeg nieuwe workshops toe, bewerk bestaande of bekijk het archief.</p>
                <div className="flex items-center text-brand-green font-medium gap-2">
                  Aan de slag <ChevronRight size={16} />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('gallery')}
                className="bg-brand-cream p-8 rounded-3xl border border-brand-green/10 cursor-pointer hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-purple-600" />
                </div>
                <h3 className="text-xl mb-2">Galerie beheren</h3>
                <p className="text-sm text-brand-dark/60 mb-6">Upload nieuwe kunstwerken en organiseer je collectie.</p>
                <div className="flex items-center text-brand-green font-medium gap-2">
                  Aan de slag <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workshops' && <WorkshopManager />}
        {activeTab === 'gallery' && <GalleryManager />}
      </main>
    </div>
  );
}
