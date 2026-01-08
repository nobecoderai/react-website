import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    const all = await productService.getProducts();
    const favIds = productService.getFavorites();
    setFavoriteProducts(all.filter(p => favIds.includes(p.id)));
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
    const handleUpdate = () => loadFavorites();
    window.addEventListener('wishlistChange', handleUpdate);
    return () => window.removeEventListener('wishlistChange', handleUpdate);
  }, []);

  if (loading) return <div className="p-12 text-center text-gray-400">Loading your favorites...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" /> My Wishlist
          </h1>
          <span className="text-sm text-gray-500">{favoriteProducts.length} items saved</span>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start browsing and click the heart icon to save products you love for later.</p>
            <Link to="/shop" className="bg-daraz-orange text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;