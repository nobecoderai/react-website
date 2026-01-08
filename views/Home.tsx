
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Zap, Sparkles, MessageCircle, X } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../constants';
import { Product, Banner } from '../types';
import ProductCard from '../components/ProductCard';
import CountdownTimer from '../components/CountdownTimer';
import { getShoppingAdvice } from '../services/geminiService';
import { productService } from '../services/productService';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryParam = searchParams.get('q')?.toLowerCase();
  const categoryParam = searchParams.get('category')?.toLowerCase();

  useEffect(() => {
    const loadData = async () => {
      const [prodData, bannerData] = await Promise.all([
        productService.getProducts(),
        productService.getBanners()
      ]);
      setAllProducts(prodData);
      setBanners(bannerData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (queryParam) {
      result = result.filter(p => p.name.toLowerCase().includes(queryParam) || p.category.toLowerCase().includes(queryParam));
    }
    if (categoryParam) {
      result = result.filter(p => p.category.toLowerCase() === categoryParam);
    }
    return result;
  }, [allProducts, queryParam, categoryParam]);

  const handleAiAdvice = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    const advice = await getShoppingAdvice(aiQuery, allProducts.map(p => p.name).join(', '));
    setAiResponse(advice);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="hidden lg:block lg:col-span-3 border rounded-lg overflow-hidden h-fit bg-white">
            <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 uppercase">Categories</div>
            {INITIAL_CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.id}`} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-daraz-orange transition-all">
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-9 relative rounded-xl overflow-hidden shadow-md group h-[140px] md:h-[220px]">
            <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
              {banners.map((banner) => (
                <div key={banner.id} className="min-w-full relative h-full">
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-4 md:p-6">
                    <h2 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">{banner.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="fill-daraz-orange text-daraz-orange" size={20} /> Flash Sale
          </h2>
          <CountdownTimer targetDate={new Date(new Date().setHours(23, 59, 59))} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white h-64 rounded-lg"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Sparkles className="text-purple-500" /> Just For You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allProducts.slice(0, 12).map(p => <ProductCard key={p.id + 'jfy'} product={p} />)}
          </div>
        </div>
      </div>

      <button onClick={() => setIsAiOpen(!isAiOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-daraz-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50">
        {isAiOpen ? <X /> : <MessageCircle size={28} />}
      </button>

      {isAiOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50 animate-in slide-in-from-bottom-4">
          <div className="bg-daraz-orange p-4 text-white font-bold flex items-center gap-2">
            <Sparkles size={18} /> Luxurious Shopping AI
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 text-sm space-y-2">
            <div className="bg-white p-2 rounded shadow-sm">Hello! How can I help you shop today?</div>
            {aiResponse && <div className="bg-daraz-orange/10 p-2 rounded border border-daraz-orange/20">{aiResponse}</div>}
            {isAiLoading && <div className="text-center py-2 animate-pulse text-gray-400">AI is thinking...</div>}
          </div>
          <div className="p-3 bg-white border-t flex gap-2">
            <input type="text" className="flex-1 text-sm bg-gray-100 rounded px-3 outline-none" placeholder="Ask about products..." value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiAdvice()} />
            <button onClick={handleAiAdvice} className="bg-daraz-orange text-white px-4 py-1.5 rounded font-bold text-sm">Ask</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
