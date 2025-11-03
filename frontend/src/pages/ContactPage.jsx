import { useState } from 'react';
import axios from 'axios';

import Layout from '../components/Layout.jsx';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
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
      await axios.post('/api/contact', form);
      setStatus({ type: 'success', message: 'Thank you! Our team will get back to you shortly.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send inquiry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="font-display text-4xl text-maroon">Contact Us</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="font-display text-2xl text-maroon">Reach out</h2>
              <p className="mt-4 text-sm text-gray-600">Phone: <span className="font-semibold">6351186290</span></p>
              <p className="text-sm text-gray-600">
                Address: <span className="font-semibold">125/ XYZ Residency, Surat – 365241</span>
              </p>
              <p className="text-sm text-gray-600">Email: hello@sareesutra.com</p>
            </div>
            <iframe
              title="SareeSutra location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3707.047265355813!2d72.82151657520261!3d21.17024098247302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e4f78fb6b27%3A0x4fcbb40f19a28d8e!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1687100000000!5m2!1sen!2sin"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl shadow-lg"
            ></iframe>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-gold/40 bg-white p-8 shadow-xl">
            <div>
              <label className="text-sm font-semibold text-maroon">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-gold/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <button type="submit" className="btn-primary w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
            {status.message && (
              <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{status.message}</p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
