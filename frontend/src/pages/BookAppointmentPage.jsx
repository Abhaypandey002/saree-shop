import { useState } from 'react';
import axios from 'axios';

import Layout from '../components/Layout.jsx';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  message: ''
};

const BookAppointmentPage = () => {
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
      await axios.post('/api/appointments', form);
      setStatus({ type: 'success', message: 'Appointment booked! We will reach out soon.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to submit appointment.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-maroon">Book an Appointment</h1>
        <p className="mt-3 text-gray-600">
          Share your details and our stylist will schedule a personalised draping session for you.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-3xl border border-gold/40 bg-white p-8 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2">
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
              <label className="text-sm font-semibold text-maroon">Preferred Date & Time</label>
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
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
            {isSubmitting ? 'Booking...' : 'Submit Appointment'}
          </button>
          {status.message && (
            <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{status.message}</p>
          )}
        </form>
      </section>
    </Layout>
  );
};

export default BookAppointmentPage;
