import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RazorpayCheckout = ({ totalAmount = 1200 }) => {
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        if (totalAmount < 1) {
            toast.error('Total amount must be at least ₹1');
            return;
        }

        const res = await loadRazorpayScript();

        if (!res) {
            toast.error('Failed to load Razorpay SDK. Please check your internet connection.');
            return;
        }

        setLoading(true); // Set loading to true before processing payment

        try {
            const response = await fetch('https://silk-route-backend.onrender.com/api/payment/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalAmount * 100 }),
            });

            const data = await response.json();

            if (!data || !data.id) {
                toast.error('Failed to create order. Please try again.');
                setLoading(false); // Reset loading state
                return;
            }

            const options = {
                key: 'rzp_test_QHmEndV7krbNP0',
                amount: data.amount,
                currency: 'INR',
                name: 'Silk Route',
                description: 'Purchase Description',
                order_id: data.id,
                handler: function (response) {
                    toast.success('Payment Successful!');
                    toast.info(`Payment ID: ${response.razorpay_payment_id}`);
                    toast.info(`Order ID: ${response.razorpay_order_id}`);
                    toast.info(`Signature: ${response.razorpay_signature}`);
                },
                prefill: {
                    name: 'Your Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setLoading(false); // Reset loading state after opening Razorpay
        } catch (error) {
            console.error('Error during payment process:', error);
            toast.error('There was an issue processing the payment. Please try again.');
            setLoading(false); // Reset loading state on error
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
                <p className="text-center mb-6">Total Amount: ₹{totalAmount}</p>
                <button
                    onClick={displayRazorpay}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Processing...' : 'Pay with Razorpay'}
                </button>
                <ToastContainer />
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="text-white text-lg">Processing your payment, please wait...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RazorpayCheckout;
