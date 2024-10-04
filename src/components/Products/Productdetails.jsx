import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";   

const ProductDetail = () => {
    const { title } = useParams(); // Get the title from the URL
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);  
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch("/data.json"); // Adjust the path to your data.json
                const data = await response.json();

                // Find the product by title
                const foundProduct = data.flatMap(category => category.products).find(p => p.title === title);

                if (!foundProduct) {
                    console.error("Product not found");
                    return;
                }
                setProduct(foundProduct);
                setSelectedImage(foundProduct.images[0]); // Set the first image as selected
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductData();
    }, [title]); // Dependency on title to refetch if it changes

    if (!product) {
        return <div>Loading...</div>; // Show a loading state while fetching
    }

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        } else {
            alert(`PRODUCT LIMIT REACHED, ONLY ${product.stock} ITEMS CAN BE PURCHASED AT A TIME`);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Function to show toast when the item is added to cart
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent unintended navigation

        const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in

        if (!user) {
            toast.error("You must be logged in to add items to your cart. Redirecting to signup...", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // Redirect to signup after toast shows
            setTimeout(() => {
                navigate('/signup');  // Redirect to signup page
            }, 3000);
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex((item) => item.title === product.title);
    
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity,
            });
        }
    
        localStorage.setItem("cartItems", JSON.stringify(cart));

        // Show a success toast
        toast.success(`${product.title} has been added to your cart!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const getImagePath = (imageName) => `http://localhost:5000/products/${imageName}`;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-gray-200 shadow-md mt-10 rounded">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img
                        src={getImagePath(selectedImage)} 
                        alt="Selected"
                        className="w-full h-72 sm:h-96 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={getImagePath(image)} 
                                alt={`Angle ${index + 1}`}
                                className={`w-full h-16 sm:h-20 object-cover cursor-pointer rounded-lg ${selectedImage === image ? "border-2 border-blue-500" : ""}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h2>
                        <p className="text-xl sm:text-2xl font-semibold mb-4 text-green-600">${product.price}</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        <div className="flex items-center mb-4">
                            <label className="block text-lg font-semibold mr-4">Quantity:</label>
                            <button className="px-2 py-1 rounded-lg bg-orange-500 flex items-center justify-center" onClick={decrementQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                </svg>
                            </button>
                            <span className="mx-4 text-lg">{quantity}</span>
                            <button className="px-2 py-1 rounded-lg bg-orange-500 flex items-center justify-center" onClick={incrementQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button 
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-600"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        <Link to="/cart/summary">
                            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-lg mt-3 hover:bg-green-600">
                                Buy Now
                            </button>
                        </Link>    
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductDetail;
