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
  const [allReports, setAllReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Statuses");

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
        if (data.success) setAllReports(data.data);
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
        setAllReports((prev) => prev.filter((r) => r._id !== reportToDelete));
      }
    } catch (error) {
      console.error("Failed to delete report:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getFilteredReports = () => {
    return allReports.filter((report) => {
      const matchesStatus =
        statusFilter === "All Statuses" ||
        report.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesStatus;
    });
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredReports = getFilteredReports();

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
            onClick={() => navigate("/get-started")}
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

        <div className="mb-4">
          <label
            htmlFor="statusFilter"
            className="text-sm font-medium text-emerald-800 mr-2"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusChange}
            className="pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-no-repeat bg-right"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {filteredReports.length === 0 ? (
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
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-emerald-100">
            <table className="min-w-full divide-y divide-emerald-50">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-50">
                {filteredReports.map((report) => (
                  <tr
                    key={report._id}
                    className="hover:bg-emerald-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {report.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status.toLowerCase() === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : report.status.toLowerCase() === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/edit-report/${report._id}`)}
                          className="p-2 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDelete(report._id)}
                          className="p-2 hover:bg-emerald-100 rounded-lg text-red-600 transition-colors"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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