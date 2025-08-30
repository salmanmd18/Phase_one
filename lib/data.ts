export type Venue = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  city: 'Dammam';
  priceSAR: number;
  capacity: number;
  amenities_en: string[];
  amenities_ar: string[];
  hero: string;
  photos: string[];
  desc_en: string;
  desc_ar: string;
};

export const venues: Venue[] = [
  {
    id: 'palm-oasis',
    slug: 'palm-oasis',
    name_en: 'Palm Oasis Resort',
    name_ar: 'منتجع واحة النخيل',
    city: 'Dammam',
    priceSAR: 1800,
    capacity: 120,
    amenities_en: ['Pool', 'Garden', 'Sound System'],
    amenities_ar: ['مسبح', 'حديقة', 'نظام صوت'],
    hero: 'https://images.unsplash.com/photo-1501117716987-c8e86df5382f?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1505692932041-c8e09b870d2e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523419409543-a7f8423e3031?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2ec0?q=80&w=1600&auto=format&fit=crop'
    ],
    desc_en: 'Modern resort in Dammam ideal for parties & weddings. Large outdoor area and indoor hall.',
    desc_ar: 'منتجع حديث في الدمام مناسب للحفلات والأعراس. مساحة خارجية كبيرة وقاعة داخلية.'
  },
  {
    id: 'sea-breeze',
    slug: 'sea-breeze',
    name_en: 'Sea Breeze Venue',
    name_ar: 'قاعة نسيم البحر',
    city: 'Dammam',
    priceSAR: 1450,
    capacity: 80,
    amenities_en: ['Sea View', 'Parking', 'Lighting'],
    amenities_ar: ['إطلالة بحرية', 'مواقف', 'إضاءة'],
    hero: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1600&auto=format&fit=crop'
    ],
    desc_en: 'Cozy venue near the corniche. Perfect for intimate events and family gatherings.',
    desc_ar: 'قاعة مريحة قرب الكورنيش. مناسبة للمناسبات الصغيرة والتجمعات العائلية.'
  }
];
