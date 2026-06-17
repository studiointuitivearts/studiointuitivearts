import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Workshop } from '../../types';
import { ICONS } from '../../assets/icons';

export function WorkshopManager() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Initial state for form
  const emptyForm: Omit<Workshop, 'id'> = {
    title: '',
    date: '',
    time: '',
    price: '',
    spots: 8,
    description: '',
    category: 'Workshop',
    status: 'active',
    imageUrl: ''
  };

  const [formData, setFormData] = useState<Omit<Workshop, 'id'>>(emptyForm);

  useEffect(() => {
    const q = query(collection(db, 'workshops'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workshop[];
      setWorkshops(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'workshops', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'workshops'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Er is een fout opgetreden bij het opslaan.');
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (workshop: Workshop) => {
    setFormData({
        title: workshop.title,
        date: workshop.date,
        time: workshop.time,
        price: workshop.price,
        spots: workshop.spots,
        description: workshop.description,
        category: workshop.category,
        status: workshop.status,
        imageUrl: workshop.imageUrl || ''
    });
    setEditingId(workshop.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Weet je zeker dat je deze workshop wilt verwijderen?')) {
      await deleteDoc(doc(db, 'workshops', id));
    }
  };

  if (loading) return <div className="flex justify-center p-24"><ICONS.loader className="text-brand-green" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif">Workshops</h2>
          <p className="text-brand-dark/60 mt-1">{workshops.length} workshops totaal</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-brand-green text-brand-cream px-6 py-3 rounded-full hover:bg-brand-green/90 transition-all font-medium"
        >
          <ICONS.plus size={20} /> Nieuwe Workshop
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-green/10">
          <h3 className="text-2xl mb-6">{editingId ? 'Workshop bewerken' : 'Nieuwe workshop toevoegen'}</h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titel</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="bijv. Gel Printing Basis"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Datum</label>
                  <input 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="14 juni 2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tijd</label>
                  <input 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="10:00 - 13:00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prijs</label>
                  <input 
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="€45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Aantal plaatsen</label>
                  <input 
                    type="number"
                    required
                    value={formData.spots}
                    onChange={e => setFormData({...formData, spots: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categorie</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-4 py-2 border rounded-xl"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Vrouwencirkel">Vrouwencirkel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Beschrijving</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl resize-none"
                  placeholder="Korte omschrijving..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Afbeelding URL</label>
                <input 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button 
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-brand-green/20 rounded-xl hover:bg-brand-cream"
              >
                Annuleren
              </button>
              <button 
                type="submit"
                className="px-8 py-2 bg-brand-green text-white rounded-xl hover:bg-brand-green/90 shadow-md"
              >
                {editingId ? 'Bijwerken' : 'Opslaan'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-brand-cream p-6 rounded-2xl border border-brand-green/5 flex flex-col md:flex-row justify-between gap-6 hover:border-brand-green/20 transition-all">
            <div className="flex gap-6">
                {workshop.imageUrl && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden hidden sm:block shrink-0">
                        <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div>
                    <h4 className="text-xl font-medium mb-2">{workshop.title}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-brand-dark/60">
                        <span className="flex items-center gap-1"><ICONS.calendar size={14} /> {workshop.date}</span>
                        <span className="flex items-center gap-1"><ICONS.clock size={14} /> {workshop.time}</span>
                        <span className="flex items-center gap-1"><ICONS.euro size={14} /> {workshop.price}</span>
                        <span className="flex items-center gap-1"><ICONS.users size={14} /> {workshop.spots} plekken</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${workshop.category === 'Workshop' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {workshop.category}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEdit(workshop)}
                className="p-3 bg-white rounded-xl hover:bg-brand-green hover:text-white transition-all text-brand-green shadow-sm"
                title="Bewerken"
              >
                <ICONS.edit size={18} />
              </button>
              <button 
                onClick={() => handleDelete(workshop.id)}
                className="p-3 bg-white rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500 shadow-sm"
                title="Verwijderen"
              >
                <ICONS.trash size={18} />
              </button>
            </div>
          </div>
        ))}

        {workshops.length === 0 && !loading && (
          <div className="text-center py-24 bg-brand-green/5 rounded-3xl border border-dashed border-brand-green/20">
            <p className="text-brand-dark/40 italic font-serif">Geen workshops gevonden. Voeg er een toe om te beginnen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
