const SareeCard = ({ saree }) => {
  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative h-64 w-full bg-ivory">
        <img
          src=
            {saree.imageUrl ||
              'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80'}
          alt={saree.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-maroon px-3 py-1 text-xs text-ivory shadow">
          {saree.fabric}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-maroon">{saree.name}</h3>
        <p className="text-sm text-gray-600">Color: {saree.color}</p>
        <p className="text-sm text-gray-600">Location: {saree.location}</p>
        <p className="mt-auto text-lg font-semibold text-gold">₹{Number(saree.price).toLocaleString()}</p>
      </div>
    </article>
  );
};

export default SareeCard;
