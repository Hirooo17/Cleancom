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
} from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/app.context";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { backendUrl, adminData } = useContext(AppContext);
  const [allReports, setAllReports] = useState([]); // Store ALL reports
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

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

      const reportsArray = response.data?.data || [];
      // Store ALL reports sorted by date (newest first)
      const sortedReports = reportsArray
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllReports(sortedReports);
      
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoadingReports(false);
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




  // Sample data
  const stats = {
    totalUsers: 235,
    totalReports: 142,
    pendingReports: 27,
    resolvedReports: 115,
  };

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

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john_doe@example.com",
      joinDate: "2025-01-15",
      reports: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane_smith@example.com",
      joinDate: "2025-02-03",
      reports: 3,
    },
    {
      id: 3,
      name: "Mark Wilson",
      email: "mark_wilson@example.com",
      joinDate: "2025-02-15",
      reports: 7,
    },
    {
      id: 4,
      name: "Sarah Jones",
      email: "sarah_jones@example.com",
      joinDate: "2025-03-20",
      reports: 2,
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
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
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
                        <button className="text-emerald-600 hover:text-emerald-900 mr-2 sm:mr-3">
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
      </div>
    );
  };

  const renderUsers = () => (
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
            placeholder="Search users..."
            className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell"
              >
                Joined
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reports
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-2 sm:ml-4 min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {user.name}
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
                    {user.reports} {window.innerWidth > 640 ? "reports" : ""}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                  <button className="text-emerald-600 hover:text-emerald-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between mt-4 sm:mt-6 gap-2">
        <div className="text-xs sm:text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">4</span> of{" "}
          <span className="font-medium">4</span> results
        </div>
        <div className="flex space-x-1 sm:space-x-2">
          <button className="inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />{" "}
            Prev
          </button>
          <button className="inline-flex items-center px-2 sm:px-3 py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next{" "}
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Create New Announcement
        </h2>
        <form className="space-y-3 sm:space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-md sm:rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm"
              placeholder="Announcement title..."
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={3}
              className="block w-full rounded-md sm:rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs sm:text-sm"
              placeholder="Announcement content..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Publish
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Recent Announcements
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-3 sm:p-4 border border-gray-100 rounded-md sm:rounded-lg hover:border-emerald-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">
                  {announcement.title}
                </h3>
                <span className="text-2xs sm:text-xs text-gray-400">
                  {announcement.date}
                </span>
              </div>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                {announcement.content}
              </p>
              <div className="flex justify-end mt-2 sm:mt-4 space-x-1 sm:space-x-2">
                <button className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />{" "}
                  Edit
                </button>
                <button className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />{" "}
                  Delete
                </button>
              </div>
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
                  name: "Trash Reports",
                  icon: <Trash2 className="w-5 h-5" />,
                  tab: "reports",
                },
                {
                  name: "Users",
                  icon: <Users className="w-5 h-5" />,
                  tab: "users",
                },
                {
                  name: "Announcements",
                  icon: <Megaphone className="w-5 h-5" />,
                  tab: "announcements",
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
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg w-full hover:bg-gray-100 transition-colors">
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
                  name: "Trash Reports",
                  icon: <Trash2 className="w-5 h-5" />,
                  tab: "reports",
                },
                {
                  name: "Users",
                  icon: <Users className="w-5 h-5" />,
                  tab: "users",
                },
                {
                  name: "Announcements",
                  icon: <Megaphone className="w-5 h-5" />,
                  tab: "announcements",
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
              {activeTab === "reports" && "Trash Reports"}
              {activeTab === "users" && "User Management"}
              {activeTab === "announcements" && "Announcements"}
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
          {activeTab === "announcements" && renderAnnouncements()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
