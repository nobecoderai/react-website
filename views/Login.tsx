import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (username === 'Admin' && password === 'Password@098') {
      const user = { name: 'Admin', role: 'admin', email: 'admin@luxuriouscart.com' };
      localStorage.setItem('lux_user', JSON.stringify(user));
      window.dispatchEvent(new Event('authChange'));
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-daraz-orange p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Portal Access</h1>
          <p className="opacity-80 text-sm">Sign in to manage Luxurious Cart</p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-start gap-3 border border-red-100">
              <AlertCircle className="shrink-0" size={18} />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-daraz-orange/20 transition-all"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-daraz-orange/20 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full bg-daraz-orange text-white py-3 rounded-xl font-bold text-lg hover:opacity-95 shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;