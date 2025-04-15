import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, CalendarDays, MapPin, Edit, Trash, Plus } from 'lucide-react';
import { AppContext } from '../context/app.context';
import axios from 'axios';

const ViewAllReports = () => {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);
  const [reports, setReports] = useState([]);

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

  return (
    <div className="min-h-screen bg-emerald-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-2">
          <Trash2 className="w-8 h-8" />
          All Cleanup Reports
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div 
              key={report.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-emerald-100 transition-all"
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
                <span className={`px-3 py-1 rounded-full text-sm ${
                  report.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {report.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {report.description}
              </p>

              <div className="flex items-center justify-between text-sm border-t pt-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(report.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-emerald-50 rounded-lg text-red-600">
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
          </div>
        )}

        <button 
          onClick={() => navigate('/report')}
          className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ViewAllReports;