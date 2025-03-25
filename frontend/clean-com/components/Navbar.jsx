import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiCalendar, FiBell, FiMail } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: <FiHome className="mr-2" /> },
    { name: "Schedule", href: "#schedule", icon: <FiCalendar className="mr-2" /> },
    { name: "Announcements", href: "#announcements", icon: <FiBell className="mr-2" /> },
    { name: "Contact", href: "#contact", icon: <FiMail className="mr-2" /> },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-lg text-emerald-700" 
          : "bg-emerald-500 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">♻️</span>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? "text-emerald-600" : "text-white"
              }`}>
                Clean Comm
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name.toLowerCase())}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeItem === item.name.toLowerCase() 
                    ? scrolled 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-emerald-600 text-white" 
                    : scrolled 
                      ? "text-emerald-700 hover:bg-emerald-50" 
                      : "text-white hover:bg-emerald-600"
                }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
              scrolled 
                ? "text-emerald-700 hover:bg-emerald-50" 
                : "text-white hover:bg-emerald-600"
            }`}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ${
          scrolled ? "bg-white" : "bg-emerald-500"
        } ${
          isMenuOpen ? "max-h-64 opacity-100 shadow-lg" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveItem(item.name.toLowerCase());
                setIsMenuOpen(false);
              }}
              className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                activeItem === item.name.toLowerCase() 
                  ? scrolled 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-emerald-600 text-white" 
                  : scrolled 
                    ? "text-emerald-700 hover:bg-emerald-50" 
                    : "text-white hover:bg-emerald-600"
              }`}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;