import React, { useState } from 'react'
import { Camera, FileText, MapPin, Send, X, Trash2, AlertCircle, Navigation } from 'lucide-react';

const ReportPage = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    location: '',
    category: 'trash',
    urgency: 'medium',
    images: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setComplaint({ ...complaint, images: [...complaint.images, ...newImages] });
  };

  const removeImage = (index) => {
    const newImages = complaint.images.filter((_, i) => i !== index);
    setComplaint({ ...complaint, images: newImages });
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setComplaint({
          ...complaint,
          location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaint);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Reset form
    setComplaint({
      title: '',
      description: '',
      location: '',
      category: 'trash',
      urgency: 'medium',
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Community Cleanliness Report</h1>
        </div>

        {submitted && (
          <div className="bg-green-100 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="text-green-600" />
            <span className="text-green-700 font-medium">Report submitted successfully! Thank you for your contribution.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              >
                <option value="trash">Overflowing Trash</option>
                <option value="illegal-dumping">Illegal Dumping</option>
                <option value="litter">Public Littering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setComplaint({ ...complaint, urgency: level })}
                    className={`p-2 rounded-lg text-sm font-medium transition-all ${complaint.urgency === level 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={complaint.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              placeholder="Briefly describe the issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={complaint.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all h-32"
              placeholder="Provide detailed information about the issue..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={complaint.location}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-24 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Enter address or coordinates"
                required
              />
              <button
                type="button"
                onClick={handleGeoLocation}
                className="absolute right-2 top-2 bg-green-100 hover:bg-green-200 px-4 py-1.5 rounded-lg text-sm font-medium text-green-700 flex items-center gap-2 transition-colors"
              >
                <Navigation size={16} />
                Current
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Evidence (Max 3 photos)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 transition-all hover:border-green-500 hover:bg-green-50">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                id="fileUpload" 
                disabled={complaint.images.length >= 3}
              />
              <label 
                htmlFor="fileUpload" 
                className="cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-gray-500 text-sm">
                  Drag & drop photos or click to upload
                </span>
                <span className="text-xs text-gray-400">
                  Recommended size: 1080x720px
                </span>
              </label>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-3">
              {complaint.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img} 
                    alt={`Evidence ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-lg border transition-transform group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
          >
            <Send size={18} />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;