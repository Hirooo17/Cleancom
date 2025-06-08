import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  FileText,
  Settings,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  AlertTriangle,
  Shield,
  Info,
  FormInputIcon,
  Printer,
  Volume2,
  Search,
  Users,
} from "lucide-react";
import { AppContext } from "../context/app.context";
import axios from "axios";

const GetStarted = () => {
  const navigate = useNavigate();

  const { backendUrl, userData } = useContext(AppContext);

  const [recentReports, setRecentReports] = useState([]);
  
  

  useEffect(() => {
    const fetchMyReports = async () => {
     
      if (!userData?.id) return;

      try {
        const { data } = await axios.get(
          backendUrl + "/api/trash-reports/my-reports/",
          {
            userId: userData.id, 
          }
        );
        

        if (data.success) {
          setRecentReports(data.data); 
          
          
        }
      } catch (err) {
        console.error("Failed to fetch user reports:", err);
      }

     
    };

    fetchMyReports();
  }, [userData]);

  const top3Reports = recentReports.slice(0, 3);

  const getReportIcon = (reportType) => {
    switch (reportType) {
      case "Noise Complaint":
        return Volume2;
      case "Lost and Found":
        return Search;
      case "Safety Concern":
        return Shield;
      case "Infrastructure Issue":
        return AlertTriangle;
      case "Community Event":
        return Users;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1  onClick={() => navigate('/')} className="text-3xl font-bold text-green-800 cursor-pointer">
            Welcome to Barangay 633
          </h1>
          <p className="text-green-600">
            Report community issues and stay connected with your barangay
          </p>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white rounded-full shadow hover:bg-green-100">
            <Bell size={20} className="text-green-700" />
          </button>
          <button className="p-2 bg-white rounded-full shadow hover:bg-green-100">
            <User size={20} className="text-green-700" />
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Your Reports
          </h3>
          <p className="text-3xl font-bold text-green-600">{recentReports.length}</p>
          <p className="text-green-500 mt-1">Active submissions</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Community Status
          </h3>
          <p className="text-3xl font-bold text-green-600">Good</p>
          <p className="text-green-500 mt-1">Overall community rating</p>
        </div>
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Quick actions */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 mb-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
                <div className="flex items-center gap-3">
                  <User className="text-green-700" size={18} />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight size={18} className="text-green-700" />
              </button>
              <button onClick={() => { navigate('/view-all-reports') }} className="w-full flex items-center justify-between p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-700" size={18} />
                  <span>View Reports</span>
                </div>
                <ChevronRight size={18} className="text-green-700" />
              </button>

              <button
                onClick={() => navigate("/report")}
                className="w-full flex items-center justify-between p-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-800"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-red-700" size={18} />
                  <span>Submit New Report</span>
                </div>
                <ChevronRight size={18} className="text-red-700" />
              </button>

              <button onClick={() => navigate("/formal-complaint")} className="w-full flex items-center justify-between p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
                <div className="flex items-center gap-3">
                  <Printer className="text-green-700" size={18} />
                  <span>Print a Formal Complaint</span>
                </div>
                <ChevronRight size={18} className="text-green-700" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Help & Support
            </h2>
            <button className="w-full flex items-center gap-3 p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800 mb-3">
              <HelpCircle size={18} className="text-green-700" />
              <span>Barangay Services FAQs</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
              <MessageSquare size={18} className="text-green-700" />
              <span>Contact Barangay Office</span>
            </button>
          </div>
        </div>

        {/* Right panel - Recent activity & community info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Recent Reports
            </h2>
            <div className="space-y-4">
              {top3Reports.length === 0 ? (
                <p className="text-green-600">You have no recent reports.</p>
              ) : (
                top3Reports.map((item, index) => {
                  const Icon = getReportIcon(item.issueType || item.category);

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b border-green-100 pb-4 last:border-0"
                    >
                      <div className="bg-green-100 p-2 rounded-full">
                        <Icon size={20} className="text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">
                          {item.title}
                        </h4>
                        <p className="text-green-600 text-sm">
                          Status: {item.status}
                        </p>
                      </div>
                      <span className="text-green-500 text-sm">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <button className="mt-4 text-green-700 hover:text-green-900 text-sm font-medium">
              View all reports →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Common Report Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-red-200 p-3 rounded-full">
                    <AlertTriangle size={24} className="text-red-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-red-800 mb-2">
                  Safety & Security
                </h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Street Light Issues</li>
                  <li>• Road Hazards</li>
                  <li>• Suspicious Activity</li>
                  <li>• Emergency Situations</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-200 p-3 rounded-full">
                    <Volume2 size={24} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-blue-800 mb-2">
                  Noise & Disturbance
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Loud Music/Parties</li>
                  <li>• Construction Noise</li>
                  <li>• Barking Dogs</li>
                  <li>• Public Disturbance</li>
                </ul>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-purple-200 p-3 rounded-full">
                    <Search size={24} className="text-purple-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-purple-800 mb-2">
                  Lost & Found
                </h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Missing Pets</li>
                  <li>• Lost Documents</li>
                  <li>• Found Items</li>
                  <li>• Missing Persons</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Info size={20} className="text-blue-500" />
                <p className="text-sm text-blue-700">
                  For emergency situations, please contact your local authorities immediately. This system is for non-emergency community reports and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;