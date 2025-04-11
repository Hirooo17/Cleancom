import React from "react";
import {
  Users,
  Shield,
  Leaf,
  Gift,
  Map,
  BarChart,
  Sparkles,
  ThumbsUp,
  Recycle,
  CheckCircle,
  Apple,
  Trash,
  Download,
  MapPin,
} from "lucide-react";
import { assets } from "../assets/assets";

const AboutPage = () => {
  // Use more descriptive team roles with brief responsibilities
  const communityHierarchy = [
    {
      title: "Community Leader",
      desc: "Guides community initiatives and long-term vision",
    },
    {
      title: "Eco Council Head",
      desc: "Coordinates sustainable projects and policies",
    },
    {
      title: "Waste Management",
      desc: "Oversees recycling and waste reduction programs",
    },
    {
      title: "Green Spaces",
      desc: "Maintains and expands community green areas",
    },
    {
      title: "Education Team",
      desc: "Provides environmental awareness resources",
    },
    {
      title: "Health & Safety",
      desc: "Ensures community wellness and safety standards",
    },
    {
      title: "Rewards Committee",
      desc: "Manages incentives for community participation",
    },
    {
      title: "Public Relations",
      desc: "Communicates initiatives to wider audiences",
    },
  ];

  // Statistics with more visual presentation
  const impactStats = [
    {
      text: "40% reduction in waste-related diseases",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
    {
      text: "75% community satisfaction increase",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
    {
      text: "Sustainable waste management systems",
      icon: <ThumbsUp size={20} className="text-green-600 mr-2" />,
    },
  ];

  const rewardTypes = [
    {
      title: "Weekly Top Reporter",
      desc: "Recognition and community store discounts",
    },
    {
      title: "Green Ambassador",
      desc: "Leadership roles and special event access",
    },
    {
      title: "Community Hero",
      desc: "Featured stories and exclusive benefits",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-green-500 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Sparkles size={64} className="mx-auto mb-6 text-green-100" />
          <h1 className="text-4xl font-bold mb-6">About Our Green Community</h1>
          <p className="text-lg text-green-100">
            Building sustainable neighborhoods through collaboration and
            innovation
          </p>
        </div>
      </div>

      {/* Community Structure Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <Shield size={48} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Community Structure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityHierarchy.map((role, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              >
                <Users size={32} className="text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-center">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-16 text-center bg-green-50 p-12 rounded-3xl">
          <Map size={48} className="mx-auto text-green-600 mb-4" />
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
                className="inline-flex items-center text-green-600 hover:text-green-700 mt-2"
              >
                <MapPin size={16} className="mr-1" /> View Larger Map
              </a>
            </div>
          </div>
        </div>

        {/* Clean Community Section */}
        <div className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Leaf size={48} className="text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Why Cleanliness Matters
            </h2>
            <p className="text-gray-600 text-lg">
              Maintaining a clean environment reduces health risks, boosts
              community morale, and creates sustainable living conditions for
              future generations.
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
          <div className="bg-green-100 h-96 rounded-2xl shadow-lg flex items-center justify-center">
            {/* Fixed image loading with error handling */}
            <img
              src={assets.community}
              alt="Clean Community"
              className="w-64 h-64"
              onError={(e) => {
                e.target.onerror = null;
                // Fallback to inline SVG if the file doesn't load
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZmlsbD0ibm9uZSI+CiAgPHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNFQ0ZERjUiLz4KICA8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjY0IiBmaWxsPSIjNEFERTgwIi8+CiAgPHBhdGggZD0iTTExMCA4MGMzMCAtMjAgNDAgMzAgODAgMTBjMTAgLTUgMzAgLTUgNDAgMGMxMCA1IDE1IDIwIDUgMzBjLTEwIDEwIC00MCAyMCAtNjAgNDBjLTIwIDIwIC0yMCA0MCAtNDAgNDBjLTIwIDAgLTQwIC0yMCAtNDAgLTQwYzAgLTIwIDEwIC00MCAxNSAtNjBaIiBmaWxsPSIjMzREM0NBIi8+Cjwvc3ZnPg==";
                console.log("SVG failed to load, using fallback");
              }}
            />
          </div>
        </div>

        {/* Waste Segregation Infographics Section */}
        <div className="mb-16 bg-white p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-8">
            <Recycle size={48} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Proper Waste Segregation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding how to correctly sort your waste is the first step
              towards a sustainable community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recyclables */}
            <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Recycle size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-blue-800">
                  Recyclables
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  Paper & Cardboard
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  Clean Plastics (1-7)
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  Glass Containers
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-blue-500 mr-2" />
                  Metal Cans & Foil
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Empty, clean and dry items only
              </p>
            </div>

            {/* Compostables */}
            <div className="bg-green-50 p-6 rounded-xl border-t-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Apple size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-green-800">
                  Compostables
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Food Scraps
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Yard Waste
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Coffee Grounds
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Soiled Paper
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                No meat, dairy or oils
              </p>
            </div>

            {/* Landfill/General Waste */}
            <div className="bg-red-50 p-6 rounded-xl border-t-4 border-red-500">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold ml-3 text-red-800">
                  Non-Recyclable
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Soft Plastics
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Polystyrene
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Contaminated Items
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-red-500 mr-2" />
                  Broken Ceramics
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Minimize this waste where possible
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Remember to rinse containers and flatten boxes before recycling
            </p>
            <button className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              <Download size={16} className="mr-2" /> Download Complete Guide
            </button>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-green-600 text-white p-12 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <Gift size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Earn Community Rewards</h2>
            <p className="text-lg mb-8">
              Report environmental issues and earn points redeemable for
              exclusive benefits
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {rewardTypes.map((reward, index) => (
                <div
                  key={index}
                  className="p-6 bg-green-700 rounded-xl hover:bg-green-800 transition-colors duration-300"
                >
                  <BarChart size={32} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                  <p className="text-green-100">{reward.desc}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
              Learn About Rewards
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-green-700 text-white py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Join Our Green Movement</h3>
        <p className="mb-6">
          Together we can build a cleaner, healthier community
        </p>
        <button className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
          Get Involved
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
