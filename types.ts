export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  affiliateUrl: string;
  description: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
  title: string;
}

export interface User {
  name: string;
  role: 'admin' | 'user' | 'affiliate';
  email: string;
}