import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RefreshCcw, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        const p = await productService.getProductById(id);
        if (p) {
          setProduct(p);
          const all = await productService.getProducts();
          setSimilarProducts(all.filter(item => item.id !== id && item.category === p.category).slice(0, 6));
        }
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAffiliateClick = async () => {
    if (!product) return;
    await productService.trackClick(product.id);
    window.open(product.affiliateUrl, '_blank');
  };

  if (loading) return <div className="p-12 text-center text-gray-400">Loading premium details...</div>;
  if (!product) return <div className="p-12 text-center text-red-500 font-bold">Product not found!</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="text-xs text-gray-500 mb-4 flex gap-2">
          <Link to="/" className="hover:text-daraz-orange">Home</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-daraz-orange capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-6">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="lg:w-2/3 p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 leading-tight mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />)}
                </div>
                <span className="text-sm font-medium text-slate-800 ml-1">{product.rating} Rating</span>
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-bold text-daraz-orange">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                <span className="text-sm font-bold text-daraz-orange">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <button 
                onClick={handleAffiliateClick} 
                className="flex-1 bg-daraz-orange text-white py-4 rounded-lg font-bold text-lg hover:opacity-95 shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 w-full"
              >
                BUY NOW <ExternalLink size={20} />
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-3">Product Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><ShieldCheck className="text-green-500" size={18} /> 100% Authentic Product</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Truck className="text-blue-500" size={18} /> Free Delivery</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><RefreshCcw className="text-orange-500" size={18} /> 7 Days Returns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {similarProducts.map(p => <ProductCard key={p.id + '_sim'} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;