import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import apiClient from "../../utils/api-client";

function Sidebar({ onCategoryClick, activeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/category');
        if (response.data) {
          setCategories(response.data);
        } else {
          throw new Error("No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories", error);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Button to open sidebar in mobile view */}
      <button
        className="top-20 p-2 z-50 md:hidden flex items-center text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
        onClick={() => setIsOpen(true)}
        style={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "600" }}
      >
        <FontAwesomeIcon icon={faBars} size="lg" className="mr-2" />
        <span className="font-extrabold">View Categories</span>
      </button>

      {/* Sidebar for mobile with smooth transitions */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className={`absolute top-0 left-0 w-3/4 bg-white h-full p-4 shadow-lg rounded-lg transition-transform duration-500 ease-in-out transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            className="text-gray-700 hover:text-red-500 mb-4"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <h2 className="text-xl font-extrabold mb-4 font-sans">Categories</h2>
          <ul className="space-y-5">
            {/* All Categories link */}
            <li>
              <NavLink
                to="/products"
                onClick={() => {
                  onCategoryClick(null);
                  setIsOpen(false);  // Close sidebar after selecting "All Categories"
                }}
                className={`flex items-center text-gray-700 hover:text-cyan-700 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-300 text-lg font-medium ${
                  activeCategory === null ? 'bg-gray-200' : ''
                }`}
              >
                All Categories
              </NavLink>
            </li>

            {/* Dynamic category links */}
            {categories.map((category) => (
              <li key={category._id}>
                <NavLink
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  onClick={() => {
                    onCategoryClick(category.name);
                    setIsOpen(false);  // Close sidebar after selecting category
                  }}
                  className={`flex items-center text-gray-700 hover:text-cyan-700 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-300 text-lg font-medium ${
                    activeCategory === category.name ? 'bg-gray-200' : ''
                  }`}
                >
                  <img
                    src={`https://silk-route-backend.onrender.com/uploads/category/${category.image}`}
                    alt={category.name}
                    className="w-10 h-10 mr-3 rounded-full object-cover"
                  />
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-1/4 bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold mb-4 font-sans">Categories</h2>
        <ul className="space-y-5">
          {/* All Categories link */}
          <li>
            <NavLink
              to="/products"
              onClick={() => onCategoryClick(null)}
              className={`flex items-center text-gray-700 hover:text-cyan-700 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-300 text-lg font-medium ${
                activeCategory === null ? 'bg-gray-200' : ''
              }`}
            >
              All Categories
            </NavLink>
          </li>

          {/* Dynamic category links */}
          {categories.map((category) => (
            <li key={category._id}>
              <NavLink
                to={`/products?category=${encodeURIComponent(category.name)}`}
                onClick={() => onCategoryClick(category.name)}
                className={`flex items-center text-gray-700 hover:text-cyan-700 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-300 text-lg font-medium ${
                  activeCategory === category.name ? 'bg-gray-200' : ''
                }`}
              >
                <img
                  src={`https://silk-route-backend.onrender.com/uploads/category/${category.image}`}
                  alt={category.name}
                  className="w-10 h-10 mr-3 rounded-full object-cover"
                />
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
