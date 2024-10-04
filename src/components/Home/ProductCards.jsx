import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { Card } from "flowbite-react";
import { toast, ToastContainer } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for the toaster
import '/src/components/Home/ProductCards.css';

function ProductCards({ id, image, price, title, rating, ratingCounts, stock }) {
  
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the "Add to Cart" button
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user details are stored in localStorage

    if (!user) {
      // Show an error toast if the user is not logged in
      toast.error("You must be logged in to add items to your cart. Redirecting to signup...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Redirect to signup page after the toast displays
      setTimeout(() => {
        navigate('/signup');  // Redirect to the signup page
      }, 3000);  // Delay to allow the toast to show
      return; // Exit the function
    }

    const product = { 
      id, 
      image: `https://silk-route-backend.onrender.com/products/${image}`, // Ensure full URL is saved
      price, 
      title, 
      stock 
    };

    // Get the existing cart items from local storage
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new product to the cart array
    const updatedCart = [...existingCart, product];

    // Store the updated cart back into local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Show a success toast
    toast.success(`${title} has been added to your cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <Card className="max-w-sm rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 bg-white dark:bg-gray-800 p-4">
      
      {/* Link only around product image and title */}
      <Link to={`/product/${title}`} className="block">
        {/* Image Container */}
        <div className="w-full h-48 mb-4">
          <img 
            src={`https://silk-route-backend.onrender.com/products/${image}`}  
            alt={title} 
            className="h-full w-full object-contain rounded-t-lg" 
          />
        </div>
        
        {/* Content Container */}
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2 hover:text-cyan-600 transition-colors duration-200">
          {title}
        </h5>
      </Link>

      {/* Rating and Price */}
      <div className="flex items-center mb-2">
        <span className="text-cyan-600 font-semibold">{rating} ⭐</span>
        <span className="text-gray-500 ml-2">({ratingCounts} reviews)</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
        {stock > 0 ? (
          <button
            onClick={handleAddToCart} // Call handleAddToCart on click
            className="rounded-lg bg-cyan-700 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-cyan-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Add to cart
          </button>
        ) : (
          <span className="text-red-500 font-semibold">Out of stock</span>
        )}
      </div>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </Card>
  );
}

export default ProductCards;
