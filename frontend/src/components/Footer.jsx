const Footer = () => (
  <footer className="mt-16 bg-maroon text-ivory">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-display text-2xl">SareeSutra</h3>
        <p className="max-w-md text-sm text-ivory/80">
          Celebrating timeless craftsmanship from the looms of India. Draping grace, one weave at a time.
        </p>
      </div>
      <div className="space-y-2 text-sm">
        <p>Phone: <a href="tel:6351186290" className="text-gold">6351186290</a></p>
        <p>Address: 125/ XYZ Residency, Surat – 365241</p>
        <p>Email: <a href="mailto:hello@sareesutra.com" className="text-gold">hello@sareesutra.com</a></p>
      </div>
    </div>
    <div className="bg-maroon/90 py-4 text-center text-xs text-ivory/70">
      © {new Date().getFullYear()} SareeSutra. All rights reserved.
    </div>
  </footer>
);

export default Footer;
