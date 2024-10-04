// EmptyCart.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  const emptyCartImage = "https://cdn-icons-png.flaticon.com/512/1640/1640562.png"; // Online image URL

  return (
    <div className="flex flex-col items-center justify-center h-64 ">
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        className="w-24 h-24 md:w-32 md:h-32 mb-4"
      />
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 mb-4">
        It looks like you haven't added anything to your cart yet.
      </p>
      
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
