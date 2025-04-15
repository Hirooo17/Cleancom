import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Edit, X, Upload, Trash2, Check } from 'lucide-react';
import { AppContext } from '../context/app.context';
import axios from 'axios';

const EditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    issueType: 'general',
    photo: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMyReports = async () => {
      if (!userData?.id) return;
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/trash-reports/my-reports/`,
          { params: { userId: userData.id } }
        );
        if (data.success) {
          // Find the specific report based on `id`
          const report = data.data.find(report => report._id === id); // Assuming `id` is from URL or state
          if (report) {
            setFormData({
              title: report.title,
              description: report.description,
              location: report.location,
              issueType: report.issueType,
              photo: null
            });
            setPreviewImage(report.photo || '');
          } else {
            setError('Report not found');
          }
        }
      } catch (err) {
        console.error("Failed to fetch user reports:", err);
        setError('Failed to load report data', err.message);
      }
    };
  
    fetchMyReports();
  }, [userData, id]); // Run whenever userData or id changes

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('location', formData.location);
      formPayload.append('issueType', formData.issueType);
      formPayload.append('userId', userData.id);
      if (formData.photo) {
        formPayload.append('photo', formData.photo);
      }
      console.log(formPayload); // Add this to check the form data being sent

      const { data } = await axios.put(
        `${backendUrl}/api/trash-reports/update-report/${id}`,
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data.success) {
        navigate('/view-all-reports');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
            <Edit className="w-6 h-6" />
            Edit Cleanup Report
          </h1>
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-emerald-50 rounded-lg text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Report Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-emerald-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                      <Upload className="w-6 h-6 text-emerald-400" />
                    </div>
                  )}
                </div>
                {previewImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('');
                      setFormData(prev => ({ ...prev, photo: null }));
                    }}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Location
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="text-emerald-600" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Issue Type
              </label>
              <select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="general">Littering</option>
                <option value="hazardous">Illegal Dumping</option>
                <option value="recyclable">Other</option>
                
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReportPage;