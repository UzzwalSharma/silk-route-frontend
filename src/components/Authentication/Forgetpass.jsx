import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true); // Start loading when form is submitted

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/forgetpassword/forgot-password', { email });
      setMessage('Password reset link has been sent to your email.');
      setIsSuccess(true); // Set success state
    } catch (error) {
      console.error(error); // Logging error for debugging
      if (error.response) {
        setMessage(error.response.data); // Show the error message from the server
      } else {
        setMessage('An error occurred while sending the reset link.');
      }
      setIsSuccess(false); // Set failure state
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Forgot your password?</h1>
        <p className="text-center text-sm text-gray-700">Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          </div>
        )}

        <div className="text-center mt-4">
          <a href="/login" className="text-xs text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
