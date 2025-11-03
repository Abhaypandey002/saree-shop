import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/book-appointment', label: 'Book Appointment' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-ivory/95 backdrop-blur border-b border-gold/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-2xl font-display text-maroon">
          SareeSutra
        </NavLink>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium md:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-gold ${isActive ? 'text-maroon font-semibold' : 'text-gray-700'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/admin/login" className="btn-primary">
          Admin Login
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
