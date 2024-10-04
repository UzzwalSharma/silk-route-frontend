import { NavLink } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css"; 
import "/src/App.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Cart count state

  // Function to update cart count based on localStorage
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get cart items from localStorage
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user object
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser.name || "Guest"); // Set username from the user object
    } else {
      setUsername("Guest"); // Default to Guest if not authenticated
    }
  
    // Set initial cart count on component mount
    updateCartCount();
  
    // Listen for changes in localStorage
    const handleStorageChange = () => {
      // Immediately update the cart count when localStorage changes
      updateCartCount();
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user object on logout
    localStorage.removeItem('cartItems'); // Clear cart items on logout
    setIsAuthenticated(false);
    setUsername(null);
    setCartCount(0); // Clear cart count on logout
    toast.success("Successfully logged out!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add this function to trigger updates to cart count from other components
  const updateCartCountFromOtherComponents = () => {
    updateCartCount();
  };

  return (
    <div className="shadow-md">
      <nav className="dark:bg-gray-900 dark:border-gray-700 navbar border-b-2 bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/silk roue.jpg" className="h-10 w-auto" alt="The Silk Route Logo" />
            <span className="self-center text-3xl font-bold tracking-tight text-gray-900 hover:text-yellow-500 transition-colors duration-300 ease-in-out">
              The Silk Route
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar">
            <ul className="flex flex-col md:flex-row items-center font-medium p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 bg-gray-50 md:bg-transparent border-t md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md md:p-0 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-900 dark:text-white'} hover:text-yellow-500 transition-colors duration-200`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md md:p-0 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-900 dark:text-white'} hover:text-yellow-500 transition-colors duration-200`
                  }
                >
                  Products
                </NavLink>
              </li>

              {/* Other navigation items */}
              {isAuthenticated ? (
                <>
                  <li>
                    <span className="block py-2 px-3 text-lg font-semibold text-gray-900 dark:text-yellow-400 bg-gray-200 dark:bg-gray-700 rounded-lg">
                      Welcome, {username}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block py-2 px-3 rounded-md text-lg font-medium text-gray-900 dark:text-white hover:text-yellow-500 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-md md:p-0 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-900 dark:text-white'} hover:text-yellow-500 transition-colors duration-200`
                    }>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-md md:p-0 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-900 dark:text-white'} hover:text-yellow-500 transition-colors duration-200`
                    }>
                      Signup
                    </NavLink>
                  </li>
                </>
              )}

              {/* Cart Icon */}
              <li className="relative">
                <NavLink
                  to="/cart/summary"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md md:p-0 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-900 dark:text-white'} hover:text-yellow-500 transition-colors duration-200`
                  }
                >
                  {/* Cart Image */}
                  <div className="relative inline-block">
                    <span>Cart</span>

                    {/* Cart count badge */}
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default Navbar;
