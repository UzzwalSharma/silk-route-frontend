import React, { useState, useRef } from "react"; 
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordRef = useRef(null);

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
  
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return; // Stop form submission if there's a validation error
    }
  
    try {
      const response = await axios.post("https://silk-route-backend.onrender.com/api/user/login", {
        email,
        password,
      });
  
      toast.success("Login successful! 🎉", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
  
      const { token, name, email: userEmail, address, gender } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email: userEmail, address, gender }));
  
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Login failed. Please try again.";
  
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-auto max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back! 🛍️
        </h2>
        <h3 className="text-center text-gray-600 text-lg">
          Please sign in to continue shopping 🛒
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              📧 Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              🔒 Password
            </label>
            <input
              ref={passwordRef}
              type={passwordVisibility ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-blue-600 mt-1 hover:underline"
            >
              {passwordVisibility ? "Hide" : "Show"} Password
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none font-medium transition duration-200"
          >
            🚀 Sign In
          </button>

          <div className="text-center">
            <NavLink to="/Forget" className="text-sm text-blue-600 hover:underline">
              Forgot your password? 🔑
            </NavLink>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              New to us?{" "}
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Create an account 🎉
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
