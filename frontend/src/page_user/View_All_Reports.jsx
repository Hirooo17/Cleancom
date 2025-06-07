import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  CalendarDays,
  MapPin,
  Edit,
  Trash,
  Plus,
  X,
  Check,
} from "lucide-react";
import { AppContext } from "../context/app.context";
import axios from "axios";

const ViewAllReports = () => {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);
  const [reports, setReports] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchMyReports = async () => {
      if (!userData?.id) return;
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/trash-reports/my-reports/`,
          { params: { userId: userData.id } }
        );
        if (data.success) setReports(data.data);
      } catch (err) {
        console.error("Failed to fetch user reports:", err);
      }
    };
    fetchMyReports();
  }, [userData]);

  const promptDelete = (reportId) => {
    setReportToDelete(reportId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/trash-reports/delete-report/${reportToDelete}`,
        { data: { userId: userData.id } }
      );

      if (data.success) {
        setReports((prev) => prev.filter((r) => r._id !== reportToDelete));
      }
    } catch (error) {
      console.error("Failed to delete report:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-4 md:p-8 relative">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-emerald-800">
                Confirm Deletion
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this report? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 flex items-center gap-2">
            <Trash2 className="w-8 h-8" />
            All Reports
          </h1>

          {/* Back Button */}
          <button
            onClick={() => navigate("/get-started")} // Navigate to the /get-started page
            className="p-2 hover:bg-emerald-50 rounded-lg text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/report")}
            className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Report
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-emerald-100 transition-all border border-emerald-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">
                    {report.locationName}
                  </h3>
                  <p className="text-sm text-emerald-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {report.location}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : report.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {report.description}
              </p>

              <div className="flex items-center justify-between text-sm border-t border-emerald-50 pt-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(report.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-report/${report._id}`)}
                    className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => promptDelete(report._id)}
                    className="p-2 hover:bg-emerald-50 rounded-lg text-red-600 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12 text-emerald-600">
            <p className="text-lg">No reports found</p>
            <p className="mt-2">Start by creating your first cleanup report!</p>
            <button
              onClick={() => navigate("/report")}
              className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Report
            </button>
          </div>
        )}

        {/* Floating Action Button (Mobile) */}
        <button
          onClick={() => navigate("/report")}
          className="md:hidden fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ViewAllReports;
