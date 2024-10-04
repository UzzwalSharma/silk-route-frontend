import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Company Information */}
        <div className="mb-6 md:mb-0 text-center md:text-left p-6">
          <h2 className="text-xl font-semibold">The Silk Route</h2>
          <p className="text-gray-400 text-sm">Delivering quality goods with precision and care.</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-github text-3xl" ></i>
          </a>
          <a
            href="https://twitter.com text-3xl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-twitter text-3xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-instagram text-3xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fab fa-linkedin text-3xl"></i>
          </a>
        </div>

        {/* Call-to-action */}
        <div>
          <a href="/products">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105">
            Shop Now
          </button></a>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-800 mt-6 pt-4 text-center text-sm text-gray-500">
      <p className="mt-4 md:mt-0 text-sm md:text-base text-white">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="font-bold">Ujjwal</span>
          </p>
        <p>&copy; 2024 The Silk Route. All rights reserved.</p>
        <p>Terms & Conditions | Privacy Policy</p>
      </div>
    </footer>
  );
}

export default Footer;
