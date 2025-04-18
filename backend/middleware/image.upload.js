// middleware/image.upload.js
import multer from 'multer';
import path from 'path';

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in the 'uploads' folder
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Use current timestamp and file extension to avoid filename collisions
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter to only accept images (you can expand this if you need more file types)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);  // Allow file
  } else {
    cb(new Error('Only image files are allowed'), false);  // Reject non-image files
  }
};

// Set up multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: Limit file size to 5MB
});

export default upload;
