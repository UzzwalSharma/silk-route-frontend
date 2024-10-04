import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submit loader

  const validatePassword = (password) => {
    const minLength = 6;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>_]/;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!symbolRegex.test(password)) {
      return "Password must include at least one symbol (!@#$%^&* etc.).";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validatePassword(newPassword); // Validate the new password
    setPasswordError(errorMessage); // Set password error state

    if (!errorMessage) { // If there are no errors, proceed to reset the password
      setIsSubmitting(true); // Set loading state
      try {
       const response = await axios.post(`https://silk-route-backend.onrender.com/api/reset/reset-password/${token}`, { newPassword });




        setMessage('Password reset successful.');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage('Error resetting password.');
      } finally {
        setIsSubmitting(false); // Stop loading state
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(""); // Clear error message on change
                }}
                required
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                disabled={isSubmitting} // Disable input while submitting
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && (
              <div className="flex items-center mt-1 bg-red-100 border border-red-400 rounded p-2">
                <svg
                  className="w-4 h-4 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a9 9 0 00-9 9 9 9 0018 0 9 9 00-9-9zM9 12h2v2H9v-2zm0-6h2v5H9V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-600 text-sm">{passwordError}</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 w-full hover:bg-blue-700 transition duration-200 transform hover:scale-105 disabled:opacity-50"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && (
          <p className={`text-center mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
