import { Product, Category, Banner } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'groceries', name: 'Groceries', icon: '🍎' },
];

export const INITIAL_BANNERS: Banner[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', link: '#', title: 'Big Sale Day' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', link: '#', title: 'New Arrivals' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80', link: '#', title: 'Limited Offers' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'M1 Pro Wireless Headphones - Deep Bass',
    category: 'electronics',
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 2150,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://daraz.pk/',
    description: 'Experience professional-grade sound with active noise cancellation and ergonomic design.',
    featured: true
  },
  {
    id: 'p2',
    name: 'Smart Watch Series 7 Plus',
    category: 'electronics',
    price: 129,
    originalPrice: 199,
    rating: 4.6,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://daraz.pk/',
    description: 'Your health partner on your wrist. Heart rate monitoring and sleep tracking.',
    featured: true
  },
  {
    id: 'p3',
    name: 'Men\'s Urban Canvas Backpack',
    category: 'fashion',
    price: 39,
    originalPrice: 55,
    rating: 4.3,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    affiliateUrl: 'https://daraz.pk/',
    description: 'Perfect for college or light travel. Water-resistant material.',
    featured: false
  }
];