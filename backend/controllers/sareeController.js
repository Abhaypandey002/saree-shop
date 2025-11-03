import Saree from '../models/Saree.js';

export const getSarees = async (req, res) => {
  try {
    const sarees = await Saree.find().sort({ createdAt: -1 });
    res.json(sarees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sarees', error: error.message });
  }
};

export const filterSarees = async (req, res) => {
  try {
    const { fabric, color, priceRange, location, search } = req.body || {};
    const query = {};

    if (fabric?.length) {
      query.fabric = { $in: fabric };
    }

    if (color?.length) {
      query.color = { $in: color };
    }

    if (location?.length) {
      query.location = { $in: location };
    }

    if (priceRange && (priceRange.min != null || priceRange.max != null)) {
      query.price = {};
      if (priceRange.min != null) {
        query.price.$gte = priceRange.min;
      }
      if (priceRange.max != null) {
        query.price.$lte = priceRange.max;
      }
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const sarees = await Saree.find(query).sort({ createdAt: -1 });
    res.json(sarees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to filter sarees', error: error.message });
  }
};
