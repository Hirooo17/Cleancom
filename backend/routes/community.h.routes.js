// routes/communityHierarchy.routes.js
import express from 'express';
import CommunityHierarchy from '../model/CommunityHierarchy.js';


const Communityrouter = express.Router();

// Get all community hierarchy positions
Communityrouter.get('/', async (req, res) => {
  try {
    const hierarchy = await CommunityHierarchy.find({ isActive: true })
      .sort({ order: 1 });
    
    res.json({
      success: true,
      data: hierarchy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching community hierarchy',
      error: error.message
    });
  }
});

// Create new position
Communityrouter.post('/', async (req, res) => {
  try {
    const { title, desc, order } = req.body;
    
    const newPosition = new CommunityHierarchy({
      title,
      desc,
      order: order || 0
    });
    
    const savedPosition = await newPosition.save();
    
    res.status(201).json({
      success: true,
      data: savedPosition,
      message: 'Position created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating position',
      error: error.message
    });
  }
});

// Update position
Communityrouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, order } = req.body;
    
    const updatedPosition = await CommunityHierarchy.findByIdAndUpdate(
      id,
      { title, desc, order },
      { new: true, runValidators: true }
    );
    
    if (!updatedPosition) {
      return res.status(404).json({
        success: false,
        message: 'Position not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedPosition,
      message: 'Position updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating position',
      error: error.message
    });
  }
});

// Delete position (soft delete)
Communityrouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPosition = await CommunityHierarchy.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!deletedPosition) {
      return res.status(404).json({
        success: false,
        message: 'Position not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Position deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting position',
      error: error.message
    });
  }
});

// Initialize default hierarchy (call this once to set up initial data)
Communityrouter.post('/initialize', async (req, res) => {
  try {
    // Check if data already exists
    const existingCount = await CommunityHierarchy.countDocuments();
    if (existingCount > 0) {
      return res.json({
        success: true,
        message: 'Hierarchy already initialized'
      });
    }

    const defaultHierarchy = [
      {
        title: "Community Leader",
        desc: "Guides community initiatives and long-term vision",
        order: 1
      },
      {
        title: "Eco Council Head",
        desc: "Coordinates sustainable projects and policies",
        order: 2
      },
      {
        title: "Waste Management",
        desc: "Oversees recycling and waste reduction programs",
        order: 3
      },
      {
        title: "Green Spaces",
        desc: "Maintains and expands community green areas",
        order: 4
      },
      {
        title: "Education Team",
        desc: "Provides environmental awareness resources",
        order: 5
      },
      {
        title: "Health & Safety",
        desc: "Ensures community wellness and safety standards",
        order: 6
      },
      {
        title: "Rewards Committee",
        desc: "Manages incentives for community participation",
        order: 7
      },
      {
        title: "Public Relations",
        desc: "Communicates initiatives to wider audiences",
        order: 8
      }
    ];

    await CommunityHierarchy.insertMany(defaultHierarchy);
    
    res.json({
      success: true,
      message: 'Default hierarchy initialized successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing hierarchy',
      error: error.message
    });
  }
});

export default Communityrouter;