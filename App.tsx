import React from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import Admin from './views/Admin';
import Login from './views/Login';
import Wishlist from './views/Wishlist';

const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role?: 'admin' | 'affiliate' }) => {
  const storedUser = localStorage.getItem('lux_user');
  if (!storedUser) return <Navigate to="/login" replace />;
  
  const user = JSON.parse(storedUser);
  if (role && user.role !== role && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const Footer: React.FC = () => (
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
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;