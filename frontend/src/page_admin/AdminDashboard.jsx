// AdminDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Users,
  Megaphone,
  Trash2,
  ClipboardList,
  LogOut,
  Gauge,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  FileText,
  AlertCircle,
  User,
  Menu,
  X,
  XIcon,
} from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/app.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



 // use context

  const { backendUrl, adminData, setAdminData, setAdminIsLogin,  } = useContext(AppContext);
  const [allReports, setAllReports] = useState([]); // Store ALL reports
  const [isLoadingReports, setIsLoadingReports] = useState(true);

const logout = async () => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/admin-logout",
      {},
      { withCredentials: true }
    );
    if (data.success){
      setAdminIsLogin(false)
      setAdminData(null)
      toast.success("Logged out successfully");
      navigate("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed: " + (error.response?.data?.message || error.message));
  }
};


// feedback
const [feedbackTitle, setFeedbackTitle] = useState('');
const [feedbackDescription, setFeedbackDescription] = useState('');
const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);


const handleSubmitFeedback = async () => {
  try {
    setIsSubmittingFeedback(true);
    
    const response = await axios.post(
      `${backendUrl}/api/feedback/create-feedback`,
      {
        reportId: selectedReport._id,
        title: feedbackTitle,
        description: feedbackDescription,
        userId: selectedReport.userId._id
      },
      {
        headers: {
          Authorization: `Bearer ${adminData?.token}`,
        },
      }
    );
    
    if (response.data.success) {
      // Update the report with the new feedback
      const updatedReport = {
        ...selectedReport,
        feedbacks: [...(selectedReport.feedbacks || []), response.data.data]
      };
      
      setSelectedReport(updatedReport);
      
      // Update the report in the allReports state
      const updatedReports = allReports.map(report => 
        report._id === selectedReport._id ? updatedReport : report
      );
      
      setAllReports(updatedReports);
      
      // Clear form
      setFeedbackTitle('');
      setFeedbackDescription('');
      
      toast.success("Feedback sent successfully");
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    toast.error("Failed to send feedback: " + (error.response?.data?.message || error.message));
  } finally {
    setIsSubmittingFeedback(false);
  }
};


  // reports variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
      // State for the report view modal
      const [isViewModalOpen, setIsViewModalOpen] = useState(false);
      const [selectedReport, setSelectedReport] = useState(null);
      const [updatingStatus, setUpdatingStatus] = useState(false);

  const reportsPerPage = 5;


  // user tab  varibles
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [searchUserTerm, setSearchUserTerm] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const usersPerPage = 5;


  // Settings Use Effects

  const [hierarchyPositions, setHierarchyPositions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', desc: '' });
  const [newPosition, setNewPosition] = useState({ title: '', desc: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch community hierarchy positions
  const fetchHierarchy = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/community-hierarchy`,
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );
      if (response.data.success) {
        setHierarchyPositions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching hierarchy:', error);
    }
  };

  useEffect(() => {
    fetchHierarchy();
  }, []);

  // Start editing
  const startEdit = (position) => {
    setEditingId(position._id);
    setEditForm({ title: position.title, desc: position.desc });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', desc: '' });
  };

  // Save edit
  const saveEdit = async () => {
    if (!editForm.title.trim() || !editForm.desc.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/community-hierarchy/${editingId}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchHierarchy();
        setEditingId(null);
        setEditForm({ title: '', desc: '' });
      }
    } catch (error) {
      console.error('Error updating position:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete position
  const deletePosition = async (id) => {
    if (!confirm('Are you sure you want to delete this position?')) return;
    
    setLoading(true);
    try {
      const response = await axios.delete(
        `${backendUrl}/api/community-hierarchy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchHierarchy();
      }
    } catch (error) {
      console.error('Error deleting position:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new position
  const addPosition = async () => {
    if (!newPosition.title.trim() || !newPosition.desc.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/community-hierarchy`,
        { ...newPosition, order: hierarchyPositions.length + 1 },
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchHierarchy();
        setNewPosition({ title: '', desc: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding position:', error);
    } finally {
      setLoading(false);
    }
  };


  
 // Fetch ALL reports
useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/trash-reports/get-reports`,
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );

       // Fetch total users (you'll need to create this endpoint)
       const usersResponse = await axios.get(
        `${backendUrl}/api/auth/count`,
        { headers: { Authorization: `Bearer ${adminData?.token}` } }
      );



      const userPage = await axios.get(
        `${backendUrl}/api/auth/users`, // You'll need to create this endpoint
        {
          headers: {
            Authorization: `Bearer ${adminData?.token}`,
          },
        }
      );

     
      
      setUsers(userPage.data);

      const reportsArray = response.data?.data || [];
      // Store ALL reports sorted by date (newest first)
      const sortedReports = reportsArray
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllReports(sortedReports);

      setAllReports(sortedReports);
      setTotalUsers(usersResponse.data.count || 0);
      
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoadingReports(false);
      setIsLoadingUsers(false);
    }
  };

  fetchReports();
}, []);








// Get recent 3 reports for dashboard
const recentReports = allReports.slice(0, 3);

// Filter logic for reports tab
const getFilteredReports = () => {
  return allReports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.userId?.name && report.userId.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All Statuses' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
};




const calculateStats = () => {
  return {
    totalReports: allReports.length,
    pendingReports: allReports.filter(report => report.status === 'Pending').length,
    resolvedReports: allReports.filter(report => report.status === 'Resolved').length,
    totalUsers: totalUsers // Now using the real user count
  };
};

const stats = calculateStats();

 

  const announcements = [
    {
      id: 1,
      title: "Upcoming City Cleanup Day",
      content:
        "Join us this Saturday for the annual city cleanup event. Volunteers should meet at City Hall at 8 AM.",
      date: "2025-04-10",
    },
    {
      id: 2,
      title: "New Recycling Guidelines",
      content:
        "Starting May 1st, plastic types 3-7 will no longer be accepted in curbside recycling.",
      date: "2025-04-05",
    },
  ];

  

  const renderDashboard = () => (

    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <Users className="w-5 h-5" />,
            color: "bg-blue-500",
          },
          {
            title: "Total Reports",
            value: stats.totalReports,
            icon: <FileText className="w-5 h-5" />,
            color: "bg-emerald-500",
          },
          {
            title: "Pending Reports",
            value: stats.pendingReports,
            icon: <AlertCircle className="w-5 h-5" />,
            color: "bg-amber-500",
          },
          {
            title: "Resolved Reports",
            value: stats.resolvedReports,
            icon: <ClipboardList className="w-5 h-5" />,
            color: "bg-green-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`${stat.color} p-2 sm:p-3 rounded-md sm:rounded-lg text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Reports Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Recent Reports
            </h2>
            <button
              onClick={() => setActiveTab("reports")}
              className="text-xs sm:text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
            </button>
          </div>

          {isLoadingReports ? (
            <p className="text-gray-400 text-sm">Loading reports...</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report._id}
                  className="flex items-start pb-3 sm:pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div
                    className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg mr-3 sm:mr-4 ${
                      report.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : report.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {report.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                      {report.location}
                    </p>
                    <div className="flex items-center mt-1 sm:mt-2 text-xs text-gray-400">
                      <span className="truncate">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <span className="mx-1 sm:mx-2">•</span>
                      <span className="truncate">
                        {report.userId?.name || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${
                      report.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : report.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Announcements
            </h2>
            <button
              onClick={() => setActiveTab("announcements")}
              className="text-xs sm:text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="pb-3 sm:pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900">
                    {announcement.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {announcement.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="flex justify-end mt-2 sm:mt-3 space-x-1 sm:space-x-2">
                  <button className="text-emerald-600 hover:text-emerald-700 p-1 rounded-md hover:bg-emerald-50">
                    <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // RENDER REPORTS SECTION TRALALEROTRALALA

  // Filter reports based on search term and status
 

  
  

  const renderReports = () => {
    const filteredReports = getFilteredReports();
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
    

  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    };
    
    const handleStatusChange = (e) => {
      setStatusFilter(e.target.value);
      setCurrentPage(1);
    };
    
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const openViewModal = (report) => {
      setSelectedReport(report);
      setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
      setIsViewModalOpen(false);
      setSelectedReport(null);
    };

    const updateReportStatus = async (newStatus) => {
      if (!selectedReport) return;
      
      setUpdatingStatus(true);
      try {
        const response = await axios.put(
          `${backendUrl}/api/trash-reports/update-report/${selectedReport._id}`,
          { 
            status: newStatus,
            userId: adminData?._id, // Include admin's ID
            isAdmin: true // Add flag to indicate this is an admin action
          },
          {
            headers: {
              Authorization: `Bearer ${adminData?.token}`,
            },
          }
        );
        
        if (response.data.success) {
          // Update the report in the local state
          const updatedReports = allReports.map(report => 
            report._id === selectedReport._id 
              ? { ...report, status: newStatus } 
              : report
          );
          
          setAllReports(updatedReports);
          setSelectedReport({ ...selectedReport, status: newStatus });
          
          // Show success message
          alert(`Report status updated to ${newStatus}`);
        }
      } catch (error) {
        console.error("Failed to update report status:", error);
        alert("Failed to update report status: " + (error.response?.data?.message || error.message));
      } finally {
        setUpdatingStatus(false);
      }
    };

    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
            User Reports
          </h2>
          <div className="flex flex-col xs:flex-row gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search reports..."
                className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 w-full"
              />
            </div>
            <select 
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
        </div>
  
        {isLoadingReports ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-400">Loading reports...</div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-400">No reports found</div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        #{report._id?.substring(0, 6)}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        <div className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                          {report.title}
                        </div>
                        <div className="text-2xs xs:text-xs text-gray-400 mt-1 truncate max-w-[120px] sm:max-w-none">
                          {report.userId?.name || "Unknown"}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                        {report.location}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        <span
                          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-2xs sm:text-xs font-medium rounded-full ${
                            report.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : report.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xs:table-cell">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button 
                          onClick={() => openViewModal(report)}
                          className="text-emerald-600 hover:text-emerald-900 mr-2 sm:mr-3"
                        >
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 hidden xs:inline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            <div className="flex flex-col xs:flex-row items-center justify-between mt-4 sm:mt-6 gap-2">
              <div className="text-xs sm:text-sm text-gray-500">
                Showing <span className="font-medium">{indexOfFirstReport + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastReport, filteredReports.length)}
                </span> of{" "}
                <span className="font-medium">{filteredReports.length}</span> results
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md ${
                    currentPage === 1 
                      ? "text-gray-400 bg-gray-50" 
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />{" "}
                  Prev
                </button>
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md ${
                    currentPage === totalPages || totalPages === 0
                      ? "text-gray-400 bg-gray-50" 
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Next{" "}
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
                </button>
              </div>
            </div>
          </>
        )}

       {/* Report View Modal */}
{isViewModalOpen && selectedReport && (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
          <button 
            onClick={closeViewModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Report Photo */}
          {selectedReport.photo && (
            <div className="mb-4">
              <img 
                src={`${backendUrl}${selectedReport.photo}`} 
                alt="Report evidence" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          {/* Report Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Title</p>
              <p className="text-sm font-medium">{selectedReport.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Reported By</p>
              <p className="text-sm font-medium">{selectedReport.userId?.name || "Unknown"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <p className="text-sm font-medium">{selectedReport.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date Reported</p>
              <p className="text-sm font-medium">{new Date(selectedReport.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Issue Type</p>
              <p className="text-sm font-medium">{selectedReport.issueType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Current Status</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${
                  selectedReport.status === "Pending"
                    ? "bg-amber-100 text-amber-800"
                    : selectedReport.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {selectedReport.status}
              </span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedReport.description}</p>
          </div>
          
          {/* Status Update */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              <button
                disabled={selectedReport.status === "Pending" || updatingStatus}
                onClick={() => updateReportStatus("Pending")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  selectedReport.status === "Pending"
                    ? "bg-amber-100 text-amber-800 cursor-not-allowed"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                }`}
              >
                Pending
              </button>
              <button
                disabled={selectedReport.status === "In Progress" || updatingStatus}
                onClick={() => updateReportStatus("In Progress")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  selectedReport.status === "In Progress"
                    ? "bg-blue-100 text-blue-800 cursor-not-allowed"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                In Progress
              </button>
              <button
                disabled={selectedReport.status === "Resolved" || updatingStatus}
                onClick={() => updateReportStatus("Resolved")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  selectedReport.status === "Resolved"
                    ? "bg-green-100 text-green-800 cursor-not-allowed"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Resolved
              </button>
            </div>
            {updatingStatus && (
              <p className="text-xs text-gray-500 mt-2">
                Updating status...
              </p>
            )}
          </div>

          {/* Feedback Section */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Send Feedback to Reporter</h4>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="feedback-title" className="block text-xs text-gray-500 mb-1">
                  Feedback Title
                </label>
                <input
                  type="text"
                  id="feedback-title"
                  placeholder="E.g. Next steps, Resolution update"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="feedback-description" className="block text-xs text-gray-500 mb-1">
                  Detailed Feedback
                </label>
                <textarea
                  id="feedback-description"
                  rows={4}
                  placeholder="Provide clear instructions or updates for the reporter..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setFeedbackTitle('');
                    setFeedbackDescription('');
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackTitle || !feedbackDescription || isSubmittingFeedback}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium ${
                    !feedbackTitle || !feedbackDescription || isSubmittingFeedback
                      ? 'bg-blue-200 text-blue-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmittingFeedback ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Feedback'}
                </button>
              </div>
            </div>
            
            {/* Existing Feedback List (if any) */}
            {selectedReport.feedbacks?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Previous Feedback</h4>
                <div className="space-y-3">
                  {selectedReport.feedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <h5 className="text-sm font-medium">{feedback.title}</h5>
                        <span className="text-xs text-gray-500">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{feedback.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end rounded-b-lg">
        <button
          onClick={closeViewModal}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    );
  };

  // RENDER USERS SECTION TRALALEROTRALALA

  // Filter users based on search term

  

// RENDER USERS SECTION

// Filter users based on search term
const getFilteredUsers = () => {
  return users.filter(user => 
    user.name.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUserTerm.toLowerCase())
  );
};

// Pagination logic
const paginateUsers = (users) => {
  const indexOfLastUser = currentUserPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  return users.slice(indexOfFirstUser, indexOfLastUser);
};

const renderUsers = () => {
  const filteredUsers = getFilteredUsers();
  const currentUsers = paginateUsers(filteredUsers);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearchChange = (e) => {
    setSearchUserTerm(e.target.value);
    setCurrentUserPage(1);
  };

  const goToNextPage = () => {
    if (currentUserPage < totalPages) {  // Fixed: use currentUserPage instead of currentPage
      setCurrentUserPage(currentUserPage + 1);  // Fixed: use currentUserPage instead of currentPage
    }
  };

  const goToPreviousPage = () => {
    if (currentUserPage > 1) {  // Fixed: use currentUserPage instead of currentPage
      setCurrentUserPage(currentUserPage - 1);  // Fixed: use currentUserPage instead of currentPage
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
          User Management
        </h2>
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchUserTerm}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 w-full"
          />
        </div>
      </div>

      {isLoadingUsers ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-400">Loading users...</div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-400">
            {searchUserTerm ? "No matching users found" : "No users available"}
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Head - unchanged from your code */}
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-4 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {user.name}
                            {!user.isverified && (
                              <span className="ml-1 text-2xs text-amber-500">(unverified)</span>
                            )}
                          </div>
                          <div className="text-2xs xs:text-xs text-gray-500 truncate sm:hidden">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xs:table-cell">
                      {user.joinDate}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-2xs sm:text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {user.reportCount} {window.innerWidth > 640 ? "reports" : ""}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <button 
                        className="text-emerald-600 hover:text-emerald-900 mr-2"
                        onClick={() => handleViewUser(user._id)}
                      >
                        View
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Ban
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col xs:flex-row items-center justify-between mt-4 sm:mt-6 gap-2">
            <div className="text-xs sm:text-sm text-gray-500">
              Showing <span className="font-medium">
              {Math.min(currentUserPage * usersPerPage, filteredUsers.length)} 
              </span> to{" "}
              <span className="font-medium">
              {Math.min(currentUserPage * usersPerPage, filteredUsers.length)}
              </span> of{" "}
              <span className="font-medium">{filteredUsers.length}</span> results
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              <button 
                onClick={goToPreviousPage} 
                disabled={currentUserPage === 1}
                className={`inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md ${
                  currentPage === 1 
                    ? "text-gray-400 bg-gray-50" 
                    : "text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" /> Prev
              </button>
              <button 
                onClick={goToNextPage} 
                disabled={currentUserPage === totalPages || totalPages === 0} 
                className={`inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md ${
                  currentPage === totalPages || totalPages === 0
                    ? "text-gray-400 bg-gray-50" 
                    : "text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                Next <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// You'll need to implement these handlers
const handleViewUser = (userId) => {
  // Navigate to user detail view or show modal
  console.log("View user:", userId);
};

const handleDeleteUser = (userId) => {
  if (window.confirm("Are you sure you want to ban this user?")) {
    axios.delete(`${backendUrl}/api/auth/delete-users/${userId}`, {
      headers: { Authorization: `Bearer ${adminData?.token}` }
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== userId));
      toast.success("User banned successfully");
    })
    .catch(error => {
      console.error("Failed to ban user:", error);
      toast.error("Failed to ban user");
    });
  }
};


  

  const renderSettings = () => (
      <div className="space-y-4 sm:space-y-6">
      {/* Community Hierarchy Management */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Community Hierarchy
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Position
          </button>
        </div>

        {/* Add New Position Form */}
        {showAddForm && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add New Position</h3>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Position title..."
                  value={newPosition.title}
                  onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>
              <div>
                <textarea
                  placeholder="Position description..."
                  value={newPosition.desc}
                  onChange={(e) => setNewPosition({ ...newPosition, desc: e.target.value })}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={addPosition}
                  disabled={loading || !newPosition.title.trim() || !newPosition.desc.trim()}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs sm:text-sm rounded-md hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hierarchy List */}
        <div className="space-y-3 sm:space-y-4">
          {hierarchyPositions.map((position) => (
            <div
              key={position._id}
              className="p-3 sm:p-4 border border-gray-100 rounded-md sm:rounded-lg hover:border-emerald-200 transition-colors"
            >
              {editingId === position._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm font-medium"
                    />
                  </div>
                  <div>
                    <textarea
                      value={editForm.desc}
                      onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                      rows={2}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={cancelEdit}
                      className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      disabled={loading || !editForm.title.trim() || !editForm.desc.trim()}
                      className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">
                      {position.title}
                    </h3>
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => startEdit(position)}
                        className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => deletePosition(position._id)}
                        className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {position.desc}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="relative flex flex-col w-72 max-w-xs bg-white">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">CleanCom Admin</h1>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {[
                {
                  name: "Dashboard",
                  icon: <Gauge className="w-5 h-5" />,
                  tab: "dashboard",
                },
                {
                  name: "Reports",
                  icon: <Trash2 className="w-5 h-5" />,
                  tab: "reports",
                },
                {
                  name: "Users",
                  icon: <Users className="w-5 h-5" />,
                  tab: "users",
                },
                {
                  name: "Settings",
                  icon: <Megaphone className="w-5 h-5" />,
                  tab: "settings",
                },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === item.tab
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <button onClick={logout} className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg w-full hover:bg-gray-100 transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">CleanCom Admin</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {[
                {
                  name: "Dashboard",
                  icon: <Gauge className="w-5 h-5" />,
                  tab: "dashboard",
                },
                {
                  name: "Reports",
                  icon: <Trash2 className="w-5 h-5" />,
                  tab: "reports",
                },
                {
                  name: "Users",
                  icon: <Users className="w-5 h-5" />,
                  tab: "users",
                },
                {
                  name: "Settings",
                  icon: <Megaphone className="w-5 h-5" />,
                  tab: "settings",
                },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === item.tab
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg w-full hover:bg-gray-100 transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none mr-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "reports" && "Reports"}
              {activeTab === "users" && "User Management"}
              {activeTab === "settings" && "Settings"}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                  A
                </div>
                <span className="ml-2 hidden md:inline">Admin</span>
                <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "reports" && renderReports()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
