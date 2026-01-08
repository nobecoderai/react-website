import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from './components/Navbar';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import Admin from './views/Admin';
import Login from './views/Login';
import Wishlist from './views/Wishlist';
=======
import Navbar from './components/Navbar.tsx';
import Home from './views/Home.tsx';
import ProductDetail from './views/ProductDetail.tsx';
import Admin from './views/Admin.tsx';
import Login from './views/Login.tsx';
import Wishlist from './views/Wishlist.tsx';
>>>>>>> 85caeb118342bd94733004b4ae83c1dc76e65192

const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role?: 'admin' | 'affiliate' }) => {
  const storedUser = localStorage.getItem('lux_user');
  if (!storedUser) return <Navigate to="/login" replace />;
<<<<<<< HEAD
  
  const user = JSON.parse(storedUser);
  if (role && user.role !== role && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
=======
  const user = JSON.parse(storedUser);
  if (role && user.role !== role && user.role !== 'admin') return <Navigate to="/" replace />;
>>>>>>> 85caeb118342bd94733004b4ae83c1dc76e65192
  return <>{children}</>;
};

const Footer: React.FC = () => (
<<<<<<< HEAD
  <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="mb-6">
          <Link to="/" className="text-2xl font-bold text-daraz-orange tracking-tight">
            Luxurious Cart
          </Link>
        </div>
        <h3 className="text-white font-bold text-lg mb-4">Customer Care</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Help Center</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">How to Buy</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Returns & Refunds</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Luxurious Cart</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-daraz-orange transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Digital Payments</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Affiliate Program</a></li>
          <li><a href="#" className="hover:text-daraz-orange transition-colors">Terms & Conditions</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-daraz-orange transition-colors cursor-pointer flex items-center justify-center">F</div>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-daraz-orange transition-colors cursor-pointer flex items-center justify-center">T</div>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-daraz-orange transition-colors cursor-pointer flex items-center justify-center">I</div>
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
        <p className="text-xs mb-4">Get the best deals straight to your inbox.</p>
        <div className="flex">
          <input type="email" placeholder="Your Email" className="bg-slate-800 px-4 py-2 rounded-l-lg outline-none w-full text-sm" />
          <button className="bg-daraz-orange text-white px-4 py-2 rounded-r-lg font-bold text-sm">SUBSCRIBE</button>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      © 2024 Luxurious Cart - Premium Affiliate Shopping Network. All rights reserved.
    </div>
=======
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
>>>>>>> 85caeb118342bd94733004b4ae83c1dc76e65192
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
<<<<<<< HEAD
      <div className="min-h-screen flex flex-col bg-gray-50">
=======
      <div className="min-h-screen flex flex-col selection:bg-daraz-orange selection:text-white">
>>>>>>> 85caeb118342bd94733004b4ae83c1dc76e65192
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
<<<<<<< HEAD
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/shop" element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="*" element={<div className="p-12 text-center">Page Not Found</div>} />
=======
            <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
            <Route path="/shop" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<div className="p-20 text-center font-black text-gray-300">404 | NOT FOUND</div>} />
>>>>>>> 85caeb118342bd94733004b4ae83c1dc76e65192
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;