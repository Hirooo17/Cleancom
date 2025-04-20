// controllers/trashReport.controller.js
import TrashReport from '../model/trashReport.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all trash reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await TrashReport.find()
      .populate('userId', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single trash report
export const getReportById = async (req, res) => {
  try {
    const report = await TrashReport.findById(req.params.id)
      .populate('userId', 'name email');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get reports by current user
export const getMyReports = async (req, res) => {
  try {
    const reports = await TrashReport.find({ userId: req.body.userId })
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new trash report
export const createReport = async (req, res) => {
 

  try {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.file);
    console.log("User ID from auth:", req.body.userId);

    // Process file upload if needed
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a photo as evidence'
      });
    }
    
    // Create report with photo path
    const report = await TrashReport.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      issueType: req.body.issueType, // Directly from form
      userId: req.body.userId, 
      photo: `/uploads/${req.file.filename}`
    });
  
    
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error("Error in createReport:", error);
    // Clean up uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update trash report
// export const updateReport = async (req, res) => {
//   try {
//     let report = await TrashReport.findById(req.params.id);
    
//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Check if user owns this report
//     if (report.userId.toString() !== req.body.userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to update this report'
//       });
//     }
    
//     // Handle file update if needed
//     if (req.file) {
//       // Delete old photo if it exists
//       const oldPhotoPath = path.join(__dirname, '..', 'public', report.photo);
//       if (fs.existsSync(oldPhotoPath)) {
//         fs.unlinkSync(oldPhotoPath);
//       }
      
//       req.body.photo = `/uploads/${req.file.filename}`;
//     }
    
//     // Update fields
//     const updatedData = {
//       title: req.body.title || report.title,
//       description: req.body.description || report.description,
//       location: req.body.location || report.location,
//       issueType: req.body.issueType || report.issueType,
//     };
    
//     // Add photo if it was uploaded
//     if (req.body.photo) {
//       updatedData.photo = req.body.photo;
//     }
    
//     report = await TrashReport.findByIdAndUpdate(
//       req.params.id, 
//       updatedData, 
//       { new: true, runValidators: true }
//     );
    
//     res.status(200).json({
//       success: true,
//       data: report
//     });
//   } catch (error) {
//     // Clean up uploaded file if there was an error
//     if (req.file) {
//       fs.unlinkSync(req.file.path);
//     }
    
//     res.status(500).json({
//       success: false, 
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };

// Update trash report
export const updateReport = async (req, res) => {
  try {
    let report = await TrashReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if user is authorized (either owner or admin)
    const isAdmin = req.body.isAdmin === true;
    const isOwner = report.userId.toString() === req.body.userId;
    
    if (!isOwner && !isAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this report'
      });
    }
    
    // If it's an admin updating just the status, handle that case
    if (isAdmin && req.body.status && Object.keys(req.body).length <= 3) { // userId, isAdmin, status
      report = await TrashReport.findByIdAndUpdate(
        req.params.id, 
        { status: req.body.status }, 
        { new: true, runValidators: true }
      );
      
      return res.status(200).json({
        success: true,
        data: report
      });
    }
    
    // Handle file update if needed (for regular user updates)
    if (req.file) {
      // Delete old photo if it exists
      const oldPhotoPath = path.join(__dirname, '..', 'public', report.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
      
      req.body.photo = `/uploads/${req.file.filename}`;
    }
    
    // Update fields
    const updatedData = {
      title: req.body.title || report.title,
      description: req.body.description || report.description,
      location: req.body.location || report.location,
      issueType: req.body.issueType || report.issueType,
      status: req.body.status || report.status
    };
    
    // Add photo if it was uploaded
    if (req.body.photo) {
      updatedData.photo = req.body.photo;
    }
    
    report = await TrashReport.findByIdAndUpdate(
      req.params.id, 
      updatedData, 
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    // Clean up uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false, 
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete trash report
export const deleteReport = async (req, res) => {
  try {
    const report = await TrashReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if user owns this report
    if (report.userId.toString() !== req.body.userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this report'
      });
    }
    
    // Delete the photo from the file system
    const photoPath = path.join(__dirname, '..', 'public', report.photo);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
    
    await report.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};