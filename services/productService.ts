import { Product, Banner } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BANNERS } from '../constants';

const STORAGE_KEY = 'luxurious_cart_products';
const BANNERS_KEY = 'luxurious_cart_banners';
const CLICKS_KEY = 'luxurious_cart_clicks';
const FAVORITES_KEY = 'luxurious_cart_favorites';

const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

const getStoredBanners = (): Banner[] => {
  const stored = localStorage.getItem(BANNERS_KEY);
  if (!stored) {
    localStorage.setItem(BANNERS_KEY, JSON.stringify(INITIAL_BANNERS));
    return INITIAL_BANNERS;
  }
  return JSON.parse(stored);
};

const getStoredClicks = (): Record<string, number> => {
  const stored = localStorage.getItem(CLICKS_KEY);
  return stored ? JSON.parse(stored) : {};
};

const getStoredFavorites = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const productService = {
  checkAuth: async () => {
    const user = localStorage.getItem('lux_user');
    return user ? JSON.parse(user) : null;
  },

  getProducts: async (): Promise<Product[]> => getStoredProducts(),

  getProductById: async (id: string): Promise<Product | undefined> => {
    return getStoredProducts().find(p => p.id === id);
  },

  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const products = getStoredProducts();
    const newProduct: Product = { ...product, id: `p${Date.now()}` };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...products, newProduct]));
    return newProduct;
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<void> => {
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...product };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    const updated = getStoredProducts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  getBanners: async (): Promise<Banner[]> => getStoredBanners(),

  addBanner: async (banner: Omit<Banner, 'id'>): Promise<Banner> => {
    const banners = getStoredBanners();
    const newBanner: Banner = { ...banner, id: `b${Date.now()}` };
    localStorage.setItem(BANNERS_KEY, JSON.stringify([...banners, newBanner]));
    return newBanner;
  },

  updateBanner: async (id: string, banner: Partial<Banner>): Promise<void> => {
    const banners = getStoredBanners();
    const index = banners.findIndex(b => b.id === id);
    if (index !== -1) {
      banners[index] = { ...banners[index], ...banner };
      localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
    }
  },

  deleteBanner: async (id: string): Promise<void> => {
    const updated = getStoredBanners().filter(b => b.id !== id);
    localStorage.setItem(BANNERS_KEY, JSON.stringify(updated));
  },

  trackClick: async (productId: string): Promise<void> => {
    const clicks = getStoredClicks();
    clicks[productId] = (clicks[productId] || 0) + 1;
    localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
  },

  toggleFavorite: (productId: string): string[] => {
    const favs = getStoredFavorites();
    const index = favs.indexOf(productId);
    let newFavs;
    if (index === -1) {
      newFavs = [...favs, productId];
    } else {
      newFavs = favs.filter(id => id !== productId);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    window.dispatchEvent(new CustomEvent('wishlistChange', { detail: newFavs }));
    return newFavs;
  },

  getFavorites: (): string[] => getStoredFavorites(),

  getStats: async () => {
    const products = getStoredProducts();
    const clicksMap = getStoredClicks();
    const totalClicks = Object.values(clicksMap).reduce((a, b) => a + b, 0);
    return {
      totalProducts: products.length,
      totalClicks,
      conversionRate: totalClicks > 0 ? `${Math.min(100, Math.round(totalClicks * 0.5))}%` : "0%",
      earnings: totalClicks * 0.5
    };
  }
};