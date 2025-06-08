import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import {
  Camera,
  FileText,
  MapPin,
  Send,
  X,
  Trash2,
  AlertCircle,
  Navigation,
} from "lucide-react";
import { AppContext } from "../context/app.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    location: "",
    issueType: "Littering", // Match your enum values exactly
    images: [], // Just keeping images array
  });

  const { backendUrl, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  // For the actual file objects that can be sent to the server
  const [fileObjects, setFileObjects] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Make sure fileObjects is an array before using spread operator
    const currentFileObjects = Array.isArray(fileObjects) ? fileObjects : [];

    setFileObjects([...currentFileObjects, ...files]);

    // Create URLs for preview
    const newImages = files.map((file) => URL.createObjectURL(file));
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
          location: `${position.coords.latitude.toFixed(
            4
          )}, ${position.coords.longitude.toFixed(4)}`,
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if userData exists
      //   if (!userData || !userData.userId) {
      //     alert("You must be logged in to submit a report.");
      //     console.log("Current userData:", userData);  // Check the user data here
      //     return;
      // }

      console.log("Submitting form with data:", complaint);
      axios.defaults.withCredentials = true;
      const formData = new FormData();
      formData.append("title", complaint.title);
      formData.append("description", complaint.description);
      formData.append("location", complaint.location);
      formData.append("issueType", complaint.issueType);
      formData.append("userId", userData.id); // Add userId to form data

      // Log what's happening with the image
      console.log("Images array:", complaint.images);

      // Append the file with the exact field name 'photo'
      if (fileObjects && fileObjects.length > 0) {
        formData.append("photo", fileObjects[0]); // Must match Multer's .single('photo')
      }

      const response = await axios.post(
        backendUrl + "/api/trash-reports/create-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // IMPORTANT for cookies!
        }
      );
      console.log("Report submitted successfully:", response.data);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      // Reset form
      setComplaint({
        title: "",
        description: "",
        location: "",
        issueType: "Littering",
        images: [],
      });
      setFileObjects([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        toast(error.response.data.message || error.message);
      } else {
        toast(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Header with title and X button on the far right */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trash2 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Community General Report
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-emerald-50 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted && (
          <div className="bg-green-100 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="text-green-600" />
            <span className="text-green-700 font-medium">
              Report submitted successfully! Thank you for your contribution.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                name="issueType"
                value={complaint.issueType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              >
                <option value="Trash">Littering</option>
                <option value="Noise Report">Noise Report</option>
                <option value="Other">Other</option>
              </select>
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
