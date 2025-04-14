// AdminDashboard.jsx
import React, { useState } from 'react';
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
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data
  const stats = {
    totalUsers: 235,
    totalReports: 142,
    pendingReports: 27,
    resolvedReports: 115
  };
  
  const recentReports = [
    { id: 1, title: 'Illegal Dumping at River Park', location: '123 Park Avenue', status: 'Pending', date: '2025-04-12', user: 'john_doe@example.com' },
    { id: 2, title: 'Overflowing Bin on Main Street', location: 'Main St & 5th Avenue', status: 'In Progress', date: '2025-04-11', user: 'jane_smith@example.com' },
    { id: 3, title: 'Trash on Beach Shoreline', location: 'Sunset Beach, North End', status: 'Pending', date: '2025-04-10', user: 'mark_wilson@example.com' },
    { id: 4, title: 'Construction Debris Left Behind', location: '456 Highland Road', status: 'Resolved', date: '2025-04-09', user: 'sarah_jones@example.com' },
    { id: 5, title: 'Plastic Waste in Park', location: 'Central Park, East Entrance', status: 'Resolved', date: '2025-04-08', user: 'robert_brown@example.com' }
  ];
  
  const announcements = [
    { id: 1, title: 'Upcoming City Cleanup Day', content: 'Join us this Saturday for the annual city cleanup event. Volunteers should meet at City Hall at 8 AM.', date: '2025-04-10' },
    { id: 2, title: 'New Recycling Guidelines', content: 'Starting May 1st, plastic types 3-7 will no longer be accepted in curbside recycling.', date: '2025-04-05' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john_doe@example.com', joinDate: '2025-01-15', reports: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane_smith@example.com', joinDate: '2025-02-03', reports: 3 },
    { id: 3, name: 'Mark Wilson', email: 'mark_wilson@example.com', joinDate: '2025-02-15', reports: 7 },
    { id: 4, name: 'Sarah Jones', email: 'sarah_jones@example.com', joinDate: '2025-03-20', reports: 2 }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: stats.totalUsers, icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
          { title: 'Total Reports', value: stats.totalReports, icon: <FileText className="w-5 h-5" />, color: 'bg-emerald-500' },
          { title: 'Pending Reports', value: stats.pendingReports, icon: <AlertCircle className="w-5 h-5" />, color: 'bg-amber-500' },
          { title: 'Resolved Reports', value: stats.resolvedReports, icon: <ClipboardList className="w-5 h-5" />, color: 'bg-green-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            <button 
              onClick={() => setActiveTab('reports')}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentReports.slice(0, 3).map(report => (
              <div key={report.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg mr-4 ${
                  report.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                  report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  <Trash2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{report.location}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <span>{report.date}</span>
                    <span className="mx-2">•</span>
                    <span>{report.user}</span>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  report.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                  report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
            <button 
              onClick={() => setActiveTab('announcements')}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                  <span className="text-xs text-gray-400">{announcement.date}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{announcement.content}</p>
                <div className="flex justify-end mt-3 space-x-2">
                  <button className="text-emerald-600 hover:text-emerald-700 p-1 rounded-md hover:bg-emerald-50">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">User Reports</h2>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 w-full"
            />
          </div>
          <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-no-repeat bg-right">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentReports.map(report => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{report.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="font-medium text-gray-900">{report.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{report.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                    report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-emerald-600 hover:text-emerald-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 w-full"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reports
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">ID: #{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {user.reports} reports
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-emerald-600 hover:text-emerald-900">View Reports</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Announcement</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              placeholder="Announcement title..."
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              id="content"
              rows={4}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              placeholder="Announcement content..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Publish Announcement
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Announcements</h2>
        <div className="space-y-4">
          {announcements.map(announcement => (
            <div key={announcement.id} className="p-4 border border-gray-100 rounded-lg hover:border-emerald-200 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-medium text-gray-900">{announcement.title}</h3>
                <span className="text-xs text-gray-400">{announcement.date}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{announcement.content}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
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
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">CleanCom Admin</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                { name: 'Dashboard', icon: <Gauge className="w-5 h-5" />, tab: 'dashboard' },
                { name: 'Trash Reports', icon: <Trash2 className="w-5 h-5" />, tab: 'reports' },
                { name: 'Users', icon: <Users className="w-5 h-5" />, tab: 'users' },
                { name: 'Announcements', icon: <Megaphone className="w-5 h-5" />, tab: 'announcements' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === item.tab
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
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
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-900">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'reports' && 'Trash Reports'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'announcements' && 'Announcements'}
          </h1>
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
                  A
                </div>
                <span className="ml-2 hidden md:inline">Admin</span>
                <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'announcements' && renderAnnouncements()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;