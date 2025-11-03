import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from '../components/Layout.jsx';

const emptyForm = {
  name: '',
  fabric: 'Silk',
  color: 'Red',
  price: '',
  location: 'Surat',
  imageUrl: ''
};

const fabricOptions = ['Silk', 'Cotton', 'Georgette', 'Banarasi', 'Organza'];
const colorOptions = ['Red', 'Blue', 'Green', 'Golden', 'Pink', 'Purple', 'Ivory'];
const locationOptions = ['Surat', 'Ahmedabad', 'Mumbai', 'Delhi', 'Chennai'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ sareeCount: 0, appointmentCount: 0, inquiryCount: 0 });
  const [sarees, setSarees] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState('');

  const token = localStorage.getItem('sareeSutraToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate, token]);

  const getAuthConfig = (isFormData = false) => ({
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {})
    }
  });

  const loadData = async () => {
    try {
      const [summaryRes, sareesRes, appointmentRes, inquiryRes] = await Promise.all([
        axios.get('/api/admin/dashboard/summary', getAuthConfig()),
        axios.get('/api/sarees'),
        axios.get('/api/admin/appointments', getAuthConfig()),
        axios.get('/api/admin/inquiries', getAuthConfig())
      ]);
      setSummary(summaryRes.data);
      setSarees(sareesRes.data);
      setAppointments(appointmentRes.data);
      setInquiries(inquiryRes.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });
      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (editingId) {
        await axios.put(`/api/admin/sarees/${editingId}`, payload, getAuthConfig(true));
        setStatus('Saree updated successfully.');
      } else {
        await axios.post('/api/admin/sarees', payload, getAuthConfig(true));
        setStatus('Saree uploaded successfully.');
      }

      setForm(emptyForm);
      setImageFile(null);
      setEditingId('');
      await loadData();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to save saree.');
    }
  };

  const handleEdit = (saree) => {
    setForm({
      name: saree.name,
      fabric: saree.fabric,
      color: saree.color,
      price: saree.price,
      location: saree.location,
      imageUrl: saree.imageUrl
    });
    setEditingId(saree._id);
    setStatus('Editing mode enabled. Update the form and submit.');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this saree?')) return;
    try {
      await axios.delete(`/api/admin/sarees/${id}`, getAuthConfig());
      await loadData();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to delete saree.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sareeSutraToken');
    navigate('/admin/login');
  };

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-maroon">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Manage sarees, appointments, and inquiries securely.</p>
          </div>
          <button onClick={handleLogout} className="btn-primary bg-gold text-maroon hover:bg-maroon hover:text-ivory">
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <h3 className="font-display text-2xl text-maroon">Sarees</h3>
            <p className="text-3xl font-semibold text-gold">{summary.sareeCount}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <h3 className="font-display text-2xl text-maroon">Appointments</h3>
            <p className="text-3xl font-semibold text-gold">{summary.appointmentCount}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <h3 className="font-display text-2xl text-maroon">Inquiries</h3>
            <p className="text-3xl font-semibold text-gold">{summary.inquiryCount}</p>
          </div>
        </div>

        <section className="mt-12 rounded-3xl border border-gold/40 bg-white p-8 shadow-xl">
          <header className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl text-maroon">{editingId ? 'Edit Saree' : 'Upload New Saree'}</h2>
            {editingId && (
              <button
                onClick={() => {
                  setForm(emptyForm);
                  setImageFile(null);
                  setEditingId('');
                  setStatus('');
                }}
                className="text-sm text-maroon underline"
              >
                Cancel edit
              </button>
            )}
          </header>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
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
              <label className="text-sm font-semibold text-maroon">Fabric</label>
              <select
                name="fabric"
                value={form.fabric}
                onChange={handleChange}
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {fabricOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Color</label>
              <select
                name="color"
                value={form.color}
                onChange={handleChange}
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {colorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Location</label>
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {locationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-maroon">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              {form.imageUrl && !imageFile && (
                <p className="mt-1 text-xs text-gray-500">Current image preserved unless replaced.</p>
              )}
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Saree' : 'Upload Saree'}
              </button>
              {status && <p className="mt-2 text-sm text-maroon">{status}</p>}
            </div>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-maroon">Manage Sarees</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {sarees.map((saree) => (
              <div key={saree._id} className="rounded-3xl border border-gold/40 bg-white p-6 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row">
                  <img src={saree.imageUrl} alt={saree.name} className="h-40 w-40 rounded-2xl object-cover" />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-display text-xl text-maroon">{saree.name}</h3>
                    <p className="text-sm text-gray-600">Fabric: {saree.fabric}</p>
                    <p className="text-sm text-gray-600">Color: {saree.color}</p>
                    <p className="text-sm text-gray-600">Location: {saree.location}</p>
                    <p className="text-sm font-semibold text-gold">₹{Number(saree.price).toLocaleString()}</p>
                    <div className="mt-4 flex gap-3">
                      <button className="btn-primary bg-gold text-maroon hover:bg-maroon hover:text-ivory" onClick={() => handleEdit(saree)}>
                        Edit
                      </button>
                      <button className="btn-primary bg-red-100 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => handleDelete(saree._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {sarees.length === 0 && <p className="text-gray-600">No sarees uploaded yet.</p>}
          </div>
        </section>

        <section className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-gold/40 bg-white p-6 shadow-xl">
            <h2 className="font-display text-2xl text-maroon">Appointments</h2>
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="rounded-2xl bg-ivory px-4 py-3 text-sm">
                  <p className="font-semibold text-maroon">{appointment.name}</p>
                  <p>{appointment.email}</p>
                  <p>{appointment.phone}</p>
                  <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                  {appointment.message && <p className="text-gray-600">{appointment.message}</p>}
                </div>
              ))}
              {appointments.length === 0 && <p className="text-gray-600">No appointments booked yet.</p>}
            </div>
          </div>
          <div className="rounded-3xl border border-gold/40 bg-white p-6 shadow-xl">
            <h2 className="font-display text-2xl text-maroon">Inquiries</h2>
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2">
              {inquiries.map((inquiry) => (
                <div key={inquiry._id} className="rounded-2xl bg-ivory px-4 py-3 text-sm">
                  <p className="font-semibold text-maroon">{inquiry.name}</p>
                  <p>{inquiry.email}</p>
                  <p>{inquiry.phone}</p>
                  {inquiry.message && <p className="text-gray-600">{inquiry.message}</p>}
                </div>
              ))}
              {inquiries.length === 0 && <p className="text-gray-600">No customer inquiries yet.</p>}
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Export detailed inquiries anytime from excel/customer_inquiries.xlsx
            </p>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
