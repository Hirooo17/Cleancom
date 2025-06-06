// models/CommunityHierarchy.js
import mongoose from 'mongoose';

const communityHierarchySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for ordering
communityHierarchySchema.index({ order: 1 });

const CommunityHierarchy = mongoose.model('CommunityHierarchy', communityHierarchySchema);

export default CommunityHierarchy;