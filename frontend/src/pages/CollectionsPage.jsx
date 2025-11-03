import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Layout from '../components/Layout.jsx';
import SareeCard from '../components/SareeCard.jsx';

const fabricOptions = ['Silk', 'Cotton', 'Georgette', 'Banarasi', 'Organza'];
const colorOptions = ['Red', 'Blue', 'Green', 'Golden', 'Pink', 'Purple', 'Ivory'];
const locationOptions = ['Surat', 'Ahmedabad', 'Mumbai', 'Delhi', 'Chennai'];

const CollectionsPage = () => {
  const [sarees, setSarees] = useState([]);
  const [filters, setFilters] = useState({
    fabric: [],
    color: [],
    location: [],
    priceRange: [0, 80000],
    search: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSarees = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/sarees/filter', {
        fabric: filters.fabric,
        color: filters.color,
        location: filters.location,
        priceRange: { min: filters.priceRange[0], max: filters.priceRange[1] },
        search: filters.search
      });
      setSarees(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load sarees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSarees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.fabric, filters.color, filters.location, filters.priceRange, filters.search]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = new Set(prev[type]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      return { ...prev, [type]: Array.from(current) };
    });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    if (newRange[0] > newRange[1]) {
      newRange.sort((a, b) => a - b);
    }
    setFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  const stats = useMemo(() => ({
    count: sarees.length,
    minPrice: sarees.length ? Math.min(...sarees.map((s) => s.price)) : 0,
    maxPrice: sarees.length ? Math.max(...sarees.map((s) => s.price)) : 0
  }), [sarees]);

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl text-maroon">Collections</h1>
          <p className="mt-3 text-gray-600">
            Discover handpicked sarees curated by weave, heritage, and hue. Fine-tune your search with real-time filters.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-[320px,1fr]">
          <aside className="rounded-3xl border border-gold/40 bg-white p-6 shadow-lg">
            <h2 className="font-display text-2xl text-maroon">Filters</h2>
            <div className="mt-6 space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-maroon">Search</h3>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                  placeholder="Search by name"
                  className="mt-2 w-full rounded-full border border-gold/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <h3 className="font-semibold text-maroon">Fabric</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {fabricOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 rounded-full bg-ivory px-3 py-2">
                      <input
                        type="checkbox"
                        checked={filters.fabric.includes(option)}
                        onChange={() => handleCheckboxChange('fabric', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-maroon">Color</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {colorOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 rounded-full bg-ivory px-3 py-2">
                      <input
                        type="checkbox"
                        checked={filters.color.includes(option)}
                        onChange={() => handleCheckboxChange('color', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-maroon">Location</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {locationOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 rounded-full bg-ivory px-3 py-2">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(option)}
                        onChange={() => handleCheckboxChange('location', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-maroon">Price Range</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.priceRange[0]}
                    onChange={(event) => handlePriceChange(0, event.target.value)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.priceRange[1]}
                    onChange={(event) => handlePriceChange(1, event.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </aside>
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-maroon">{stats.count}</span> sarees
                {stats.count > 0 && (
                  <span>
                    {' '}
                    (₹{stats.minPrice.toLocaleString()} – ₹{stats.maxPrice.toLocaleString()})
                  </span>
                )}
              </p>
              <button onClick={fetchSarees} className="btn-primary text-sm">
                Refresh
              </button>
            </div>
            {isLoading && <p className="text-center text-maroon">Loading sarees...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sarees.map((saree) => (
                <SareeCard key={saree._id} saree={saree} />
              ))}
            </div>
            {!isLoading && !error && sarees.length === 0 && (
              <p className="mt-10 text-center text-gray-600">No sarees found for the selected filters.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;
