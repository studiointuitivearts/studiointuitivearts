import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from './lib/firebase';
import { Workshop, GalleryItem, Testimonial } from './types';

export function useWorkshops(onlyActive: boolean = true) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = query(collection(db, 'workshops'), orderBy('createdAt', 'desc'));
    
    if (onlyActive) {
      q = query(collection(db, 'workshops'), where('status', '==', 'active'), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workshop[];
      setWorkshops(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [onlyActive]);

  return { workshops, loading };
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { items, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];
      setTestimonials(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { testimonials, loading };
}
