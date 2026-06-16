/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Workshop, GalleryItem, Testimonial } from './types';

export const WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Gel Printing',
    date: '14 juni 2025',
    time: '10:00 - 13:00',
    price: '€45',
    spots: 8,
    category: 'Workshop',
    description: 'Ontdek de magie van mono-printing op een gelli plate. We werken met lagen, texturen en kleuren.'
  },
  {
    id: '2',
    title: 'Art Journaling',
    date: '21 juni 2025',
    time: '10:00 - 12:30',
    price: '€35',
    spots: 6,
    category: 'Workshop',
    description: 'Creëer je eigen visuele dagboek. Een plek voor experiment en expressie zonder oordeel.'
  },
  {
    id: '3',
    title: 'Vrouwencirkel',
    date: '28 juni 2025',
    time: '20:00 - 22:00',
    price: '€25',
    spots: 10,
    category: 'Vrouwencirkel',
    description: 'Een avond van verbinding, zachtheid en intuïtief delen in een veilige setting.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Flowing Waters',
    category: 'Mini Art',
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000'
  },
  {
    id: '2',
    title: 'Botanical Prints',
    category: 'Print Art',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000'
  },
  {
    id: '3',
    title: 'Inner Journey',
    category: 'Art Journals',
    imageUrl: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?q=80&w=1000'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marieke',
    text: 'De workshop Gel Printing was een openbaring. Anne creëert een sfeer waarin alles mag ontstaan.'
  },
  {
    id: '2',
    name: 'Linda',
    text: 'Eindelijk een plek waar ik mijn creativiteit weer heb teruggevonden door te luisteren naar mijn intuïtie.'
  }
];
