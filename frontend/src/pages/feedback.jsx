import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app.context";
import axios from "axios";
import { MessageSquare, ChevronLeft, FileText } from "lucide-react";

const FeedbackPage = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState([]);
  const [reportTitles, setReportTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AppContext state:", { backendUrl, userData }); // Debug context

    const fetchFeedbackAndReports = async () => {
      if (!userData?.id) {
        console.warn("User ID not found in context:", userData);
        setError("User not logged in. Please log in to view feedback.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching feedback for user ID:", userData.id); // Debug userId
        const { data } = await axios.get(
          `${backendUrl}/api/feedback/get-user-feedback/${userData.id}`
        );

        console.log("Feedback API response:", data); // Debug feedback response
        if (data.success) {
          setFeedbackList(data.data);

          // Fetch report titles for each feedback's reportId
          const titles = {};
          await Promise.all(
            data.data.map(async (feedback) => {
              try {
                const reportResponse = await axios.get(
                  `${backendUrl}/api/trash-reports/report-by-id/${feedback.reportId}`
                );
                console.log(`Report response for ${feedback.reportId}:`, reportResponse.data); // Debug report response
                if (reportResponse.data.success) {
                  titles[feedback.reportId] = reportResponse.data.data.title;
                } else {
                  titles[feedback.reportId] = "Unknown Report";
                }
              } catch (err) {
                console.error(`Failed to fetch report ${feedback.reportId}:`, err.response || err);
                titles[feedback.reportId] = "Unknown Report";
              }
            })
          );
          setReportTitles(titles);
        } else {
          setError(data.message || "Failed to fetch feedback");
        }
      } catch (err) {
        console.error("Failed to fetch feedback:", err.response || err); // Debug error
        setError(`An error occurred while fetching feedback: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Retry fetch if userData.id becomes available
    const checkUserId = setInterval(() => {
      if (userData?.id) {
        clearInterval(checkUserId);
        fetchFeedbackAndReports();
      }
    }, 500);

    // Cleanup interval on unmount
    return () => clearInterval(checkUserId);
  }, [userData, backendUrl]);

  return (
    <div className="bg-green-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Your Feedback
          </h1>
          <p className="text-green-600">
            View responses from the Barangay regarding your reports
          </p>
        </div>
        <button
          onClick={() => navigate("/get-started")}
          className="flex items-center gap-2 p-2 bg-white rounded-full shadow hover:bg-green-100"
        >
          <ChevronLeft size={20} className="text-green-700" />
          <span className="text-green-700 font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Feedback List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Feedback on Your Reports
        </h2>

        {loading ? (
          <p className="text-green-600">Loading feedback...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : feedbackList.length === 0 ? (
          <p className="text-green-600">No feedback available yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((feedback) => (
              <div
                key={feedback._id}
                className="border-b border-green-100 pb-4 last:border-0"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageSquare size={20} className="text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-green-800">{feedback.title}</h3>
                    <p className="text-green-600 text-sm mt-1">{feedback.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <FileText size={16} className="text-green-500" />
                      <span className="text-green-500 text-sm">
                        Report: {reportTitles[feedback.reportId] || "Unknown Report"}
                      </span>
                    </div>
                    <span className="text-green-500 text-sm block mt-1">
                      Received: {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;