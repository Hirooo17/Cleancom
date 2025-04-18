// routes/trashReport.routes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getAllReports, 
  getReportById, 
  createReport, 
  updateReport, 
  deleteReport, 
  getMyReports
} from '../controller/trashReport.controller.js';
import userAuth from '../middleware/user.auth.js';

const trashReporRouter = express.Router();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
import fs from 'fs';
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(path.join(__dirname, '..', 'public'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'public'));
}
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  
  storage,
  limits: { fileSize: 5000000 }, // 5MB max file size
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
      
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed!'));
    }
  }
});

// Routes
trashReporRouter.get('/get-reports', getAllReports);
trashReporRouter.get('/my-reports', userAuth, getMyReports);
trashReporRouter.get('/report-by-id/:id', getReportById);
trashReporRouter.post('/create-report', userAuth, upload.single('photo'), createReport);
trashReporRouter.put('/update-report/:id', userAuth, upload.single('photo'), updateReport);
trashReporRouter.delete('/delete-report/:id', userAuth, deleteReport);

export default trashReporRouter;