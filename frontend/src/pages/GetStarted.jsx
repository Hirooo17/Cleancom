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
  Trash2,
  Recycle,
  Info,
  FormInputIcon,
  Printer,
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

  return (
    <div className="bg-green-50 min-h-screen p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Welcome to CleanTrash
          </h1>
          <p className="text-green-600">
            Report issues and learn about proper waste management
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
          <p className="text-green-500 mt-1">1 in progress</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Community Impact
          </h3>
          <p className="text-3xl font-bold text-green-600">74%</p>
          <p className="text-green-500 mt-1">Area cleanliness rating</p>
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
                  <span>Submit New Complaint</span>
                </div>
                <ChevronRight size={18} className="text-red-700" />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
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
              <span>Waste Management FAQs</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-800">
              <MessageSquare size={18} className="text-green-700" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Right panel - Recent activity & waste info */}
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
                  const Icon =
                    item.issueType === "Illegal Dumping" ? Trash2 : Recycle; // Adjust icon logic as needed

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
              Proper Waste Segregation Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-200 p-3 rounded-full">
                    <Recycle size={24} className="text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-green-800 mb-2">
                  Recyclables
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Paper & Cardboard</li>
                  <li>• Plastic Bottles</li>
                  <li>• Metal Cans</li>
                  <li>• Glass Containers</li>
                </ul>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-yellow-200 p-3 rounded-full">
                    <Trash2 size={24} className="text-yellow-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-yellow-800 mb-2">
                  Organic Waste
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Food Scraps</li>
                  <li>• Garden Waste</li>
                  <li>• Coffee Grounds</li>
                  <li>• Eggshells</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <Trash2 size={24} className="text-gray-700" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-gray-800 mb-2">
                  Non-recyclable
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Styrofoam</li>
                  <li>• Chip Bags</li>
                  <li>• Certain Plastics</li>
                  <li>• Diapers</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Info size={20} className="text-blue-500" />
                <p className="text-sm text-blue-700">
                  Learn more about waste management and disposal guidelines in
                  your area.
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
