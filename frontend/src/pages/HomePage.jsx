import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Layout from '../components/Layout.jsx';
import SareeCard from '../components/SareeCard.jsx';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { data } = await axios.get('/api/sarees');
        setFeatured(data.slice(0, 6));
      } catch (error) {
        console.error('Failed to load featured sarees', error);
      }
    };

    loadFeatured();
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-ivory via-white to-gold/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-20 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">SareeSutra</p>
            <h1 className="font-display text-4xl leading-tight text-maroon md:text-5xl">
              “Drape Yourself in Grace.”
            </h1>
            <p className="max-w-xl text-gray-600">
              Discover curated saree collections that celebrate India’s heritage weaves. Each drape tells a story of
              artistry, elegance, and timeless charm.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/collections" className="btn-primary">
                Explore Collections
              </Link>
              <Link to="/book-appointment" className="btn-primary bg-gold text-maroon hover:bg-maroon hover:text-ivory">
                Book a Visit
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-gold/30 blur-3xl" aria-hidden />
              <img
                src="https://images.unsplash.com/photo-1525876184535-4f6c46673ec3?auto=format&fit=crop&w=900&q=80"
                alt="Saree draping"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-display text-3xl text-maroon">Shop by Category</h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          Explore curated edits inspired by India’s most beloved weaving traditions.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Banarasi Heritage', description: 'Opulent zari work woven in timeless gold hues.' },
            { title: 'Contemporary Organza', description: 'Featherlight drapes with modern embroideries.' },
            { title: 'Classic Kanjivaram', description: 'Rich temple borders and heirloom craftsmanship.' }
          ].map((category) => (
            <div key={category.title} className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="font-display text-2xl text-maroon">{category.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{category.description}</p>
              <Link to="/collections" className="btn-primary mt-6 inline-flex text-sm">
                View Sarees
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="font-display text-3xl text-maroon">5000+</h3>
            <p className="mt-2 text-sm text-gray-600">Customers Served</p>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="font-display text-3xl text-maroon">30+</h3>
            <p className="mt-2 text-sm text-gray-600">Curated Collections</p>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="font-display text-3xl text-maroon">100%</h3>
            <p className="mt-2 text-sm text-gray-600">Handpicked Quality</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl text-maroon">Featured Sarees</h2>
              <p className="text-sm text-gray-600">A glimpse into our best-loved drapes this season.</p>
            </div>
            <Link to="/collections" className="btn-primary text-sm">
              View All
            </Link>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((saree) => (
              <SareeCard key={saree._id} saree={saree} />
            ))}
            {featured.length === 0 && <p className="text-gray-600">Upload sarees from the admin panel to see them here.</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-maroon px-8 py-16 text-center text-ivory shadow-xl">
          <h2 className="font-display text-3xl">Visit Our Studio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-ivory/80">
            Experience bespoke styling sessions curated by our design consultants. Schedule your appointment and immerse
            yourself in couture craftsmanship.
          </p>
          <Link to="/book-appointment" className="btn-primary mt-6 inline-flex bg-gold text-maroon hover:bg-ivory">
            Book an Appointment
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
