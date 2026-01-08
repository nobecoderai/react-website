import React, { useState, useEffect } from 'react';
import { Search, Heart, User, Menu, X, Star, LogIn } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User as UserType } from '../types';
import { productService } from '../services/productService';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserType | null>(null);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const storedUser = localStorage.getItem('lux_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    setFavCount(productService.getFavorites().length);
    
    window.addEventListener('authChange', checkAuth);
    const handleFavChange = (e: any) => setFavCount(e.detail.length);
    window.addEventListener('wishlistChange', handleFavChange);
    
    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('wishlistChange', handleFavChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isOffersActive = location.pathname === '/shop';
  const isWishlistActive = location.pathname === '/wishlist';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-gray-100 py-1 text-xs text-gray-600 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/affiliate-program" className="hover:text-daraz-orange transition-colors">Become an Affiliate</Link>
            <Link to="/help" className="hover:text-daraz-orange transition-colors">Help & Support</Link>
          </div>
          <div className="flex gap-4">
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-daraz-orange font-semibold transition-colors">Admin Panel</Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
<Link
  to="/"
  className="text-xl sm:text-2xl font-bold text-daraz-orange tracking-tight whitespace-nowrap"
>
  Luxurious Cart
</Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search in Luxurious Cart"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border border-transparent focus:border-daraz-orange focus:bg-white px-4 py-2 rounded-md outline-none transition-all"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-daraz-orange text-white rounded-r-md hover:opacity-90 transition-opacity">
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-6">
          {user ? (
            <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="hidden md:flex flex-col items-center text-gray-700 hover:text-daraz-orange transition-colors">
              <User size={22} />
              <span className="text-xs mt-1">Account</span>
            </Link>
          ) : (
            <Link to="/login" className="hidden md:flex flex-col items-center text-gray-700 hover:text-daraz-orange transition-colors">
              <LogIn size={22} />
              <span className="text-xs mt-1">Login</span>
            </Link>
          )}

          <Link 
            to="/wishlist" 
            className={`flex flex-col items-center transition-colors relative ${isWishlistActive ? 'text-daraz-orange' : 'text-gray-700 hover:text-daraz-orange'}`}
          >
            <Heart size={22} fill={isWishlistActive ? 'currentColor' : 'none'} />
            <span className="text-xs mt-1 font-medium">Wishlist</span>
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favCount}
              </span>
            )}
          </Link>

          <Link 
            to="/shop" 
            className={`flex flex-col items-center transition-colors ${isOffersActive ? 'text-daraz-orange' : 'text-gray-700 hover:text-daraz-orange'}`}
          >
            <Star size={22} fill={isOffersActive ? 'currentColor' : 'none'} />
            <span className="text-xs mt-1 font-medium">Offers</span>
          </Link>
          
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 p-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
           <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 px-4 py-2 rounded-md outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-col gap-4 font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-daraz-orange">Home</Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className={isWishlistActive ? 'text-daraz-orange' : 'hover:text-daraz-orange'}>My Wishlist</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className={isOffersActive ? 'text-daraz-orange' : 'hover:text-daraz-orange'}>Shop All (Offers)</Link>
            {!user && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-daraz-orange">Login</Link>}
            {user?.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="hover:text-daraz-orange">Admin Panel</Link>}
            {user && <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="hover:text-daraz-orange">Dashboard</Link>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;