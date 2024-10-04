import React from 'react';
import CartPage from './Cartpage';

function Cartcomponent() {
  const user = JSON.parse(localStorage.getItem('user')) || {}; // Retrieve user info from localStorage

  return (
    <div>
      {/* User Info */}
      <section className="mb-8 p-2 rounded-lg shadow-lg flex" style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Conditional rendering based on gender */}
        
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s" alt="Male User" className="w-20 h-20 text-green-500 mr-4" />
      

        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <p className="text-lg"><strong>Name:</strong> {user.name || "N/A"}</p>
          <p className="text-lg"><strong>Address:</strong> {user.address || "N/A"}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email || "N/A"}</p>
        </div>
      </section>
      <CartPage />
    </div>
  );
}

export default Cartcomponent;
