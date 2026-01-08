import React, { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFav, setIsFav] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  useEffect(() => {
    const favs = productService.getFavorites();
    setIsFav(favs.includes(product.id));
    
    const handleUpdate = (e: any) => {
      setIsFav(e.detail.includes(product.id));
    };
    window.addEventListener('wishlistChange', handleUpdate);
    return () => window.removeEventListener('wishlistChange', handleUpdate);
  }, [product.id]);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    productService.toggleFavorite(product.id);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-daraz-orange text-white text-[10px] font-bold px-2 py-0.5 rounded">
            -{discount}%
          </div>
        )}
        <button 
          onClick={handleToggleFav}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10"
        >
          <Heart size={16} fill={isFav ? '#ef4444' : 'none'} className={isFav ? 'text-red-500' : ''} />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-daraz-orange transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-2">
          <span className="text-lg font-bold text-daraz-orange">${product.price}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            <span className="text-[10px] text-gray-500">-{discount}%</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2 flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={1} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;