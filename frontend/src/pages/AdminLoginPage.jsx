import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from '../components/Layout.jsx';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const { data } = await axios.post('/api/admin/login', form);
      localStorage.setItem('sareeSutraToken', data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-gold/40 bg-white p-8 shadow-xl">
          <h1 className="font-display text-3xl text-maroon">Admin Login</h1>
          <p className="mt-3 text-sm text-gray-600">Access the SareeSutra dashboard.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="text-sm font-semibold text-maroon">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
            {status.message && (
              <p className={`text-center text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLoginPage;
