import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import EmptyCart from './Empty.jsx';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const deleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
    toast.info('Item removed from cart!');
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const clearCart = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel your order?");
    if (confirmCancel) {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      toast.success("Your order has been canceled!");
    }
  };

  const handleCheckout = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success("Thank you for your order!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-100 mt-4 shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">
        Your Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-xs md:text-sm leading-normal">
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">Product</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-center">Price</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-center">Quantity</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-center">Total</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left whitespace-nowrap flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-lg mr-2 md:mr-4"
                      />
                      <span className="font-semibold">{item.title}</span>
                    </td>

                    <td className="py-2 md:py-3 px-2 md:px-6 text-center">
                      <span className="font-semibold">${item.price}</span>
                    </td>

                    <td className="py-2 md:py-3 px-2 md:px-6 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-1 md:px-2 py-1 rounded-lg bg-orange-500 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 md:w-7 md:h-7 text-gray-800"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                          </svg>
                        </button>
                        <span className="mx-2 md:mx-4 font-semibold">{item.quantity || 1}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-1 md:px-2 py-1 rounded-lg bg-orange-500 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 md:w-7 md:h-7 text-gray-600"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="py-2 md:py-3 px-2 md:px-6 text-center">
                      <span className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </td>

                    <td className="py-2 md:py-3 px-2 md:px-6 text-center">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6h18M9 6V4h6v2m4 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Total:</h2>
            <p className="text-xl md:text-2xl font-semibold">${calculateTotal()}</p>
          </div>

          <div className="mt-8">
            <Link to="/checkout">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 text-white py-2 md:py-3 rounded-lg text-base md:text-lg hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="mt-4">
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 md:py-3 rounded-lg text-base md:text-lg hover:bg-red-600"
            >
              Cancel Order
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default CartPage;
