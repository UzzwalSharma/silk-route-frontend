// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
      <h1 className="text-7xl font-extrabold text-pink-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Uh oh! This page ran away!
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        It seems like we can't find the page you're looking for.
        Maybe it's off chasing laser pointers or hiding in a box!
      </p>

      {/* Funny cat typing GIF */}
      <img
        src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
        alt="Frantic Cat Typing"
        className="w-72 h-72 mb-8 rounded-lg shadow-lg"
      />

      {/* Back to Home button */}
      <Link
        to="/"
        className="bg-pink-600 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-700 transition duration-300"
      >
        Let's get you back on track!
      </Link>
    </div>
  );
};

export default NotFound;
