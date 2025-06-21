import Feedback from "../model/feedback.js";
import TrashReport from "../model/trashReport.model.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const { reportId, title, description, userId } = req.body;
    
    // Verify reportId exists in TrashReport
    const reportExists = await TrashReport.findById(reportId);
    if (!reportExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID'
      });
    }

    const feedback = new Feedback({
      reportId,
      title,
      description,
      userId
    });

    await feedback.save();
    
    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get feedback for a specific user
export const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.params.userId })
      .populate({
        path: 'reportId',
        select: 'title',
        // Ensure only valid TrashReport documents are included
        match: { _id: { $exists: true } }
      })
      .sort('-createdAt');

    // Filter out feedback with null reportId (in case of orphaned feedback)
    const filteredFeedback = feedback.map(item => ({
      ...item._doc,
      reportId: item.reportId || { title: 'Report Not Found' }
    }));

    res.status(200).json({
      success: true,
      count: filteredFeedback.length,
      data: filteredFeedback
    });
  } catch (err) {
    console.error('Error fetching user feedback:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    let feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (err) {
    console.error('Error updating feedback:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    await feedback.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};