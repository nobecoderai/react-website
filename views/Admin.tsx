import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, LayoutDashboard, Package, Image as ImageIcon, X, ImagePlus, LogOut, Check, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product, Banner } from '../types';
import { productService } from '../services/productService';

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'banners'>('dashboard');
  const navigate = useNavigate();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalClicks: 0,
    conversionRate: "0%",
    earnings: 0
  });

  const initialProductState: Partial<Product> = {
    name: '',
    price: 0,
    originalPrice: 0,
    category: 'electronics',
    affiliateUrl: '',
    image: '', 
    description: '',
    rating: 5,
    reviews: 0,
    featured: false
  };

  const [newProduct, setNewProduct] = useState<Partial<Product>>(initialProductState);

  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    title: '',
    imageUrl: '',
    link: '#'
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const [prods, s, bans] = await Promise.all([
      productService.getProducts(),
      productService.getStats(),
      productService.getBanners()
    ]);
    setProducts(prods);
    setStats(s);
    setBanners(bans);
  };

  const handleLogout = () => {
    localStorage.removeItem('lux_user');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.affiliateUrl || !newProduct.image) {
      alert("Please fill in all required fields (Name, Price, Image URL, Affiliate URL).");
      return;
    }

    setIsUpdating(true);
    const productData = {
      name: newProduct.name!,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      category: newProduct.category!,
      affiliateUrl: newProduct.affiliateUrl!,
      image: newProduct.image!,
      description: newProduct.description || 'No description provided.',
      rating: Number(newProduct.rating) || 5,
      reviews: Number(newProduct.reviews) || 0,
      featured: !!newProduct.featured
    };

    if (editingProductId) {
      await productService.updateProduct(editingProductId, productData);
    } else {
      await productService.addProduct(productData);
    }

    setIsAdding(false);
    setEditingProductId(null);
    setNewProduct(initialProductState);
    setIsUpdating(false);
    await refreshData();
  };

  const openEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditingProductId(product.id);
    setIsAdding(true);
  };

  const handleSaveBanner = async () => {
    if (!newBanner.imageUrl || !newBanner.title) {
      alert("Image URL and Title are required.");
      return;
    }
    setIsUpdating(true);
    const bannerData = {
      title: newBanner.title!,
      imageUrl: newBanner.imageUrl!,
      link: newBanner.link || '#'
    };

    if (editingBannerId) {
      await productService.updateBanner(editingBannerId, bannerData);
    } else {
      await productService.addBanner(bannerData);
    }

    setIsAddingBanner(false);
    setEditingBannerId(null);
    setNewBanner({ title: '', imageUrl: '', link: '#' });
    setIsUpdating(false);
    await refreshData();
  };

  const openEditBanner = (banner: Banner) => {
    setNewBanner(banner);
    setEditingBannerId(banner.id);
    setIsAddingBanner(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await productService.deleteProduct(id);
      await refreshData();
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      await productService.deleteBanner(id);
      await refreshData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 font-bold text-xl border-b border-slate-800 flex items-center justify-between">
          <span>Portal</span>
          <button onClick={handleLogout} className="text-slate-500 hover:text-daraz-orange">
            <LogOut size={20} />
          </button>
        </div>
        <nav className="flex-1 py-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${activeTab === 'dashboard' ? 'bg-daraz-orange text-white' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${activeTab === 'products' ? 'bg-daraz-orange text-white' : 'hover:bg-slate-800'}`}>
            <Package size={20} /> Manage Products
          </button>
          <button onClick={() => setActiveTab('banners')} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${activeTab === 'banners' ? 'bg-daraz-orange text-white' : 'hover:bg-slate-800'}`}>
            <ImageIcon size={20} /> Manage Banners
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 min-w-0">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h1>
            <p className="text-sm text-gray-500">Managing Luxurious Cart Content</p>
          </div>
          {activeTab !== 'dashboard' && (
            <button 
              onClick={() => { 
                if (activeTab === 'products') {
                  setNewProduct(initialProductState);
                  setEditingProductId(null);
                  setIsAdding(true);
                } else {
                  setNewBanner({ title: '', imageUrl: '', link: '#' });
                  setEditingBannerId(null);
                  setIsAddingBanner(true);
                }
              }}
              className="bg-daraz-orange text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
            >
              <Plus size={18} /> New {activeTab === 'products' ? 'Product' : 'Banner'}
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Products</div>
              <div className="text-2xl font-bold text-slate-800">{stats.totalProducts}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Total Clicks</div>
              <div className="text-2xl font-bold text-slate-800">{stats.totalClicks}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Conv. Rate</div>
              <div className="text-2xl font-bold text-green-500">{stats.conversionRate}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Est. Earnings</div>
              <div className="text-2xl font-bold text-daraz-orange">${stats.earnings}</div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-xs text-gray-500 font-bold uppercase">
                   <tr>
                     <th className="px-6 py-4">Product</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4">Price</th>
                     <th className="px-6 py-4">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {products.map(p => (
                     <tr key={p.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 flex items-center gap-3">
                         <img src={p.image} className="w-10 h-10 object-cover rounded shadow-sm" alt={p.name} />
                         <span className="text-sm font-medium truncate max-w-[200px]">{p.name}</span>
                       </td>
                       <td className="px-6 py-4 text-xs font-medium text-gray-500 capitalize">{p.category}</td>
                       <td className="px-6 py-4 text-sm font-bold text-daraz-orange">${p.price}</td>
                       <td className="px-6 py-4 flex gap-2">
                         <button onClick={() => openEditProduct(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"><Edit2 size={16} /></button>
                         <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={b.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={b.title} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <button onClick={() => openEditBanner(b)} className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform"><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteBanner(b.id)} className="bg-white p-2 rounded-full text-red-600 hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{b.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">{b.link}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-daraz-orange p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsAdding(false)} className="hover:bg-black/10 p-1 rounded transition-colors"><X /></button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. M1 Wireless Headphones" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price ($) *</label>
                  <input type="number" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Original Price ($)</label>
                  <input type="number" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all capitalize" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Living</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rating (1-5)</label>
                  <input type="number" step="0.1" max="5" min="1" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.rating} onChange={e => setNewProduct({...newProduct, rating: Number(e.target.value)})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} placeholder="https://unsplash.com/..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Affiliate URL (Amazon/Daraz) *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newProduct.affiliateUrl} onChange={e => setNewProduct({...newProduct, affiliateUrl: e.target.value})} placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all h-24 resize-none" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Describe your product..."></textarea>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={handleSaveProduct} disabled={isUpdating} className="bg-daraz-orange text-white px-8 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                  {isUpdating ? 'Saving...' : <><Save size={18} /> Save Product</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Banner Modal */}
        {isAddingBanner && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-daraz-orange p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingBannerId ? 'Edit Banner' : 'Add New Banner'}</h2>
                <button onClick={() => setIsAddingBanner(false)} className="hover:bg-black/10 p-1 rounded transition-colors"><X /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Banner Title *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newBanner.imageUrl} onChange={e => setNewBanner({...newBanner, imageUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Link</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg outline-none focus:border-daraz-orange transition-all" value={newBanner.link} onChange={e => setNewBanner({...newBanner, link: e.target.value})} placeholder="#" />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                <button onClick={() => setIsAddingBanner(false)} className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={handleSaveBanner} disabled={isUpdating} className="bg-daraz-orange text-white px-8 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                  {isUpdating ? 'Saving...' : <><ImagePlus size={18} /> Save Banner</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;