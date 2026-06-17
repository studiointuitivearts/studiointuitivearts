import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { GalleryItem } from '../../types';
import { Plus, Trash2, ImageIcon, Loader2, X } from 'lucide-react';

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mini Art' as const,
    imageUrl: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setItems(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'gallery'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setFormData({ title: '', category: 'Mini Art', imageUrl: '' });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Fout bij het toevoegen.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Verwijderen uit de galerie?')) {
      await deleteDoc(doc(db, 'gallery', id));
    }
  };

  if (loading) return <div className="flex justify-center p-24"><Loader2 className="animate-spin text-brand-green" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif">Galerie</h2>
          <p className="text-brand-dark/60 mt-1">{items.length} kunstwerken</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-brand-green text-brand-cream px-6 py-3 rounded-full hover:bg-brand-green/90 transition-all font-medium"
        >
          <Plus size={20} /> Nieuw Kunstwerk
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-green/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl">Kunstwerk toevoegen</h3>
            <button onClick={() => setShowForm(false)} className="text-brand-dark/40 hover:text-brand-dark"><X size={24} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Titel</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border"
                  placeholder="bijv. Inner Flower"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categorie</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-4 py-3 rounded-xl border"
                >
                  <option value="Mini Art">Mini Art</option>
                  <option value="Print Art">Print Art</option>
                  <option value="Art Journals">Art Journals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Afbeelding URL</label>
                <input 
                  required
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-green text-white py-4 rounded-xl font-medium shadow-lg hover:bg-brand-green/90"
              >
                Opslaan in Galerie
              </button>
            </div>
            
            <div className="bg-brand-green/5 aspect-[3/4] rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-brand-green/20">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-brand-green/30">
                  <ImageIcon size={64} className="mx-auto mb-4" />
                  <p className="font-serif italic">Preview weergave</p>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="group relative bg-brand-cream rounded-2xl overflow-hidden border border-brand-green/5 hover:shadow-xl transition-all h-full flex flex-col">
            <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button 
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            <div className="p-4">
                <p className="text-[10px] uppercase tracking-tighter text-brand-green font-bold mb-1">{item.category}</p>
                <h4 className="font-serif text-brand-dark leading-tight">{item.title}</h4>
            </div>
          </div>
        ))}

        {items.length === 0 && !loading && (
          <div className="col-span-full text-center py-24 bg-brand-green/5 rounded-3xl border border-dashed border-brand-green/20">
            <p className="text-brand-dark/40 italic font-serif">Nog geen kunstwerken in de galerie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
