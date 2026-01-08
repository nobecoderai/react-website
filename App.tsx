import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './views/Home.tsx';
import ProductDetail from './views/ProductDetail.tsx';
import Admin from './views/Admin.tsx';
import Login from './views/Login.tsx';
import Wishlist from './views/Wishlist.tsx';

const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role?: 'admin' | 'affiliate' }) => {
  const storedUser = localStorage.getItem('lux_user');
  if (!storedUser) return <Navigate to="/login" replace />;
  const user = JSON.parse(storedUser);
  if (role && user.role !== role && user.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
};

const Footer: React.FC = () => (
  <footer className="bg-daraz-navy text-gray-400 py-12 md:py-20 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-daraz-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-black">L</span>
            </div>
            <span className="text-white font-black tracking-tighter text-xl">LUXURIOUS CART</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">Experience the pinnacle of curated affiliate shopping. We hand-pick the finest deals across the digital marketplace.</p>
        </div>
        
        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-6">Customer Care</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="mailto:hadimalikoficial@gmail.com" className="text-gray-300 hover:text-daraz-orange transition-colors">Support & Suggestions</a></li>
            <li><span className="text-gray-500 cursor-default">Help Center</span></li>
            <li><span className="text-gray-500 cursor-default">Shipping Policy</span></li>
            <li><span className="text-gray-500 cursor-default">Track Your Order</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-6">Company</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><span className="text-gray-500 cursor-default">Our Story</span></li>
            <li><span className="text-gray-500 cursor-default">Affiliate Program</span></li>
            <li><span className="text-gray-500 cursor-default">Privacy Policy</span></li>
            <li><span className="text-gray-500 cursor-default">Terms of Service</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-6">Newsletter</h4>
          <p className="text-xs mb-4">Stay updated with premium drops.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl outline-none focus:border-daraz-orange transition-all w-full text-sm" />
            <button className="bg-daraz-orange text-white px-4 py-3 rounded-xl font-bold text-xs uppercase hover:bg-opacity-90 transition-all">Join</button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">© 2024 LUXURIOUS CART - PREMIUM AFFILIATE PARTNER</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-daraz-orange selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
            <Route path="/shop" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<div className="p-20 text-center font-black text-gray-300">404 | NOT FOUND</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;