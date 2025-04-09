import mongoose from 'mongoose';

export const createComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  category: {
    type: String,
    required: true,
    enum: ['trash', 'illegal-dumping', 'litter', 'hazardous', 'other'],
    default: 'trash'
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  evidence: [{
    url: { type: String, required: true },
    public_id: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  adminComments: [{
    comment: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Corrected
createComplaintSchema.index({ location: '2dsphere' });

const Complaint = mongoose.model('Complaint', createComplaintSchema);
export default Complaint;
