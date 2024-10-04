import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";  // Import the spinner

const SignupForm = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state for spinner
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

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
    
    const errorMessage = validatePassword(password);
    setPasswordError(errorMessage);
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (!errorMessage) {
      setLoading(true);  // Show spinner when starting the request
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("deliveryAddress", address);
        if (image) {
          formData.append("profilePic", image);
        }

        const response = await axios.post('https://silk-route-backend.onrender.com/api/user/signup', formData);
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          const userInfo = { name, email, address };
          localStorage.setItem('user', JSON.stringify(userInfo));

          toast.success("Signup successful!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          toast.error("Signup failed! Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
      } finally {
        setLoading(false);  // Hide spinner after the request completes
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prev) => !prev);
    confirmPasswordRef.current.type = confirmPasswordRef.current.type === "password" ? "text" : "password";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-5xl p-8 space-y-6 bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-4xl font-extrabold text-center " style={{color:"#4169E1"}}>
          🛒 Welcome to The Silk Route!!
        </h2>

        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div>
            {image ? (
              <img src={image} alt="User Uploaded" className="h-32 w-32 object-cover rounded-full" />
            ) : (
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixWENwTZdvqJbo7WMo7JJX4yBrk5Mif_bxg&s" alt="User" className="h-32 w-32" />
            )}
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
              Upload Profile Image
            </label>
            <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="mt-1" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={passwordVisibility ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 px-3 text-gray-600">
                  {passwordVisibility ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  ref={confirmPasswordRef}
                  type={confirmPasswordVisibility ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 px-3 text-gray-600">
                  {confirmPasswordVisibility ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your delivery address"
            />
          </div>

          {passwordError && (
            <div className="text-red-600 text-sm">{passwordError}</div>
          )}

          <div className="flex justify-center">
            {loading ? (
              <ClipLoader color="#4169E1" size={40} />  // Spinner while loading
            ) : (
              <button
                type="submit"
                className="px-6 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SignupForm;
