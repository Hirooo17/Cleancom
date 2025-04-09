// complaint.controller.js

import Complaint from "../model/complaint.model.js";

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, urgency, location, images } = req.body;

    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

    const newComplaint = new Complaint({
      user: req.user.id, // assuming user ID is attached from token middleware
      title,
      description,
      category,
      urgency,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
        address: 'Not yet resolved' // Optional: Use reverse geocoding here
      },
      evidence: images.map(img => ({ url: img })) // Add `public_id` if you use Cloudinary
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted', complaint: newComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
