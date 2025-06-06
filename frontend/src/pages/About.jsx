import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Leaf,
  Gift,
  Map,
  BarChart,
  Sparkles,
  ThumbsUp,
  CheckCircle,
  Download,
  MapPin,
  Volume2,
  Lightbulb,
  Car,
  Home,
  TreePine,
  AlertTriangle,
  Phone,
  Wrench,
} from "lucide-react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/app.context";
import axios from "axios";

const AboutPage = () => {
  const [communityHierarchy, setCommunityHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl, adminData } = useContext(AppContext);

  // Fetch community hierarchy from API
  useEffect(() => {
    const fetchCommunityHierarchy = async () => {
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
          setCommunityHierarchy(response.data.data);
        } else {
          // Fallback to default hierarchy if API fails
          setCommunityHierarchy([
            {
              title: "Community Leader",
              desc: "Guides community initiatives and coordinates responses",
            },
            {
              title: "Safety & Security",
              desc: "Oversees community safety and emergency protocols",
            },
            {
              title: "Environmental Team",
              desc: "Manages waste, noise, and environmental concerns",
            },
            {
              title: "Infrastructure",
              desc: "Handles maintenance and utility-related issues",
            },
            {
              title: "Public Relations",
              desc: "Manages communication and community outreach",
            },
            {
              title: "Health & Welfare",
              desc: "Addresses health concerns and community wellness",
            },
            {
              title: "Traffic & Parking",
              desc: "Coordinates traffic flow and parking regulations",
            },
            {
              title: "Event Coordination",
              desc: "Organizes community events and gatherings",
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching community hierarchy:', error);
        // Fallback to default hierarchy if API fails
        setCommunityHierarchy([
          {
            title: "Community Leader",
            desc: "Guides community initiatives and coordinates responses",
          },
          {
            title: "Safety & Security",
            desc: "Oversees community safety and emergency protocols",
          },
          {
            title: "Environmental Team",
            desc: "Manages waste, noise, and environmental concerns",
          },
          {
            title: "Infrastructure",
            desc: "Handles maintenance and utility-related issues",
          },
          {
            title: "Public Relations",
            desc: "Manages communication and community outreach",
          },
          {
            title: "Health & Welfare",
            desc: "Addresses health concerns and community wellness",
          },
          {
            title: "Traffic & Parking",
            desc: "Coordinates traffic flow and parking regulations",
          },
          {
            title: "Event Coordination",
            desc: "Organizes community events and gatherings",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityHierarchy();
  }, []);

  // Updated statistics for general community improvement
  const impactStats = [
    {
      text: "60% faster response to community issues",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
    {
      text: "85% community satisfaction increase",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
    {
      text: "Improved neighborhood communication",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
  ];

  const rewardTypes = [
    {
      title: "Community Reporter",
      desc: "Recognition for active community participation",
    },
    {
      title: "Neighborhood Ambassador",
      desc: "Leadership roles and special event access",
    },
    {
      title: "Community Hero",
      desc: "Featured stories and exclusive benefits",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Sparkles size={64} className="mx-auto mb-6 text-blue-100" />
          <h1 className="text-4xl font-bold mb-6">About Our Community</h1>
          <p className="text-lg text-blue-100">
            Building stronger neighborhoods through collaboration and communication
          </p>
        </div>
      </div>

      {/* Community Structure Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <Shield size={48} className="mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Community Structure
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading community structure...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {communityHierarchy.map((role, index) => (
                <div
                  key={role._id || index}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                >
                  <Users size={32} className="text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center">{role.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Section */}
        <div className="mb-16 text-center bg-blue-50 p-12 rounded-3xl">
          <Map size={48} className="mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Community Locations
          </h2>

          {/* OpenStreetMap Integration */}
          <div className="h-96 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="w-full h-full relative">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=120.99573135375978%2C14.598184183343193%2C121.00495815277101%2C14.60375539129449&amp;layer=mapnik&amp;marker=14.600969846455223%2C121.00034475326538"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                title="Santa Mesa, Manila Map"
              ></iframe>
            </div>
            <div className="bg-white py-4 px-6 border-t border-gray-200">
              <p className="font-medium text-gray-800">
                633 Santa Mesa, Manila
              </p>
              <p className="text-gray-600">1008 Metro Manila</p>
              <a
                href="https://www.openstreetmap.org/?mlat=14.6010&amp;mlon=121.0003#map=17/14.6010/121.0003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2"
              >
                <MapPin size={16} className="mr-1" /> View Larger Map
              </a>
            </div>
          </div>
        </div>

        {/* Community Reporting Section */}
        <div className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Shield size={48} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Why Community Reporting Matters
            </h2>
            <p className="text-gray-600 text-lg">
              Active community reporting helps create safer, cleaner, and more 
              livable neighborhoods for everyone. Your voice makes a difference 
              in addressing local concerns promptly.
            </p>
            <ul className="space-y-4">
              {impactStats.map((stat, index) => (
                <li key={index} className="flex items-center">
                  {stat.icon}
                  <span>{stat.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-100 h-96 rounded-2xl shadow-lg flex items-center justify-center">
            {/* Fixed image loading with error handling */}
            <img
              src={assets.community}
              alt="Community"
              className="w-64 h-64"
              onError={(e) => {
                e.target.onerror = null;
                // Fallback to inline SVG if the file doesn't load
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZmlsbD0ibm9uZSI+CiAgPHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNFQkY4RkYiLz4KICA8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjY0IiBmaWxsPSIjMzMzM0ZGIi8+CiAgPHBhdGggZD0iTTExMCA4MGMzMCAtMjAgNDAgMzAgODAgMTBjMTAgLTUgMzAgLTUgNDAgMGMxMCA1IDE1IDIwIDUgMzBjLTEwIDEwIC00MCAyMCAtNjAgNDBjLTIwIDIwIC0yMCA0MCAtNDAgNDBjLTIwIDAgLTQwIC0yMCAtNDAgLTQwYzAgLTIwIDEwIC00MCA1IC02MFoiIGZpbGw9IiM2NjY2RkYiLz4KPC9zdmc+";
                console.log("SVG failed to load, using fallback");
              }}
            />
          </div>
        </div>

        {/* Report Categories Section */}
        <div className="mb-16 bg-white p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-8">
            <AlertTriangle size={48} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Community Report Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Report various community issues to help maintain a safe and pleasant 
              neighborhood for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Environmental Issues */}
            <div className="bg-green-50 p-6 rounded-xl border-t-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Leaf size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-green-800">
                  Environmental
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Waste Management
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Illegal Dumping
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Air Quality Issues
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Tree & Green Space
                </li>
              </ul>
            </div>

            {/* Noise Complaints */}
            <div className="bg-red-50 p-6 rounded-xl border-t-4 border-red-500">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Volume2 size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-red-800">
                  Noise Issues
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Loud Music/Parties
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Construction Noise
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Vehicle Noise
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Animal Disturbances
                </li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="bg-orange-50 p-6 rounded-xl border-t-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Wrench size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-orange-800">
                  Infrastructure
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-orange-500 mr-2" />
                  Street Lighting
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-orange-500 mr-2" />
                  Road Damage
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-orange-500 mr-2" />
                  Water/Sewer Issues
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-orange-500 mr-2" />
                  Public Facilities
                </li>
              </ul>
            </div>

            {/* Traffic & Parking */}
            <div className="bg-purple-50 p-6 rounded-xl border-t-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Car size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-purple-800">
                  Traffic & Parking
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-purple-500 mr-2" />
                  Illegal Parking
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-purple-500 mr-2" />
                  Traffic Violations
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-purple-500 mr-2" />
                  Blocking Access
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-purple-500 mr-2" />
                  Abandoned Vehicles
                </li>
              </ul>
            </div>

            {/* Safety & Security */}
            <div className="bg-red-50 p-6 rounded-xl border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Shield size={24} className="text-red-700" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-red-900">
                  Safety & Security
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-600 mr-2" />
                  Suspicious Activity
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-600 mr-2" />
                  Vandalism
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-600 mr-2" />
                  Street Safety
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-600 mr-2" />
                  Emergency Issues
                </li>
              </ul>
            </div>

            {/* Property Issues */}
            <div className="bg-yellow-50 p-6 rounded-xl border-t-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Home size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-yellow-800">
                  Property Issues
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-yellow-500 mr-2" />
                  Building Violations
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-yellow-500 mr-2" />
                  Property Maintenance
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-yellow-500 mr-2" />
                  Zoning Issues
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-yellow-500 mr-2" />
                  Neighborhood Disputes
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              For emergency situations, always call local emergency services first
            </p>
            <div className="flex justify-center space-x-4">
              <button className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Download size={16} className="mr-2" /> Reporting Guidelines
              </button>
              <button className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                <Phone size={16} className="mr-2" /> Emergency Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-blue-600 text-white p-12 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <Gift size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Earn Community Rewards</h2>
            <p className="text-lg mb-8">
              Report community issues and earn points redeemable for exclusive 
              benefits and recognition
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {rewardTypes.map((reward, index) => (
                <div
                  key={index}
                  className="p-6 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors duration-300"
                >
                  <BarChart size={32} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                  <p className="text-blue-100">{reward.desc}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Learn About Rewards
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-blue-700 text-white py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
        <p className="mb-6">
          Together we can build a better, safer neighborhood for everyone
        </p>
        <button className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
          Get Involved
        </button>
      </div>
    </div>
  );
};

export default AboutPage;