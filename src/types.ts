/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  price: string;
  spots: number;
  description: string;
  category: 'Workshop' | 'Vrouwencirkel';
  imageUrl?: string;
  status: 'active' | 'archived';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Mini Art' | 'Print Art' | 'Art Journals';
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  videoUrl?: string;
}
