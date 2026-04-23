import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data.success) {
        login(res.data.token, res.data.user);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-12 border border-zinc-700">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 w-24 h-24 bg-green-600 rounded-2xl flex items-center justify-center text-6xl">
            ABC
          </div>
          <h1 className="text-4xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">ABC Technologies</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 focus:border-green-500 rounded-2xl px-6 py-5 text-lg placeholder:text-gray-500"
              placeholder="admin@abctech.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 focus:border-green-500 rounded-2xl px-6 py-5 text-lg placeholder:text-gray-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 py-5 rounded-2xl font-bold text-lg disabled:opacity-70 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-8 text-xs text-gray-500">
          Demo: admin@abctech.com / admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;