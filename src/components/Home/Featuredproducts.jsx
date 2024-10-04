import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ProductCards from './ProductCards';
import apiClient from "../../utils/api-client"; // Assuming you have an API client set up
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel CSS
import { ToastContainer } from 'react-toastify'; // Import ToastContainer here
import 'react-toastify/dist/ReactToastify.css';  // Import Toast CSS
import "./Featuredproducts.css";

function Featuredproducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/products");
        const products = response.data.products;

        // Select 3 random products from the product list
        const selectedProducts = selectRandomProducts(products, 3);

        setFeaturedProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to select 'n' random products
  const selectRandomProducts = (allProducts, n) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div className='main'>
      <section>
        <h1>Featured Products</h1>
      </section>

      <section className='carousel'>
        {loading ? (
          <p>Loading featured products...</p>
        ) : (
          featuredProducts.length > 0 ? (
            <>
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                useKeyboardArrows={true}
                autoPlay={true}
                interval={2000}
                stopOnHover={true}
                showThumbs={true}
                dynamicHeight={false} // Adjust height based on content
                className="carousel-container" // Added class for CSS targeting
                swipeable={true}
                centerSlidePercentage={100}
                emulateTouch={true}
                centerMode={true}
              >
                {featuredProducts.map((product) => (
                  <div key={product._id} className="carousel-item">
                    <ProductCards
                      id={product._id}
                      image={product.images[0]}
                      price={product.price}
                      title={product.title}
                      rating={product.reviews.rate}
                      ratingCounts={product.reviews.counts}
                      stock={product.stock}
                    />
                  </div>
                ))}
              </Carousel>

              {/* ToastContainer outside the carousel */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </>
          ) : (
            <p>No featured products available</p>
          )
        )}
      </section>
    </div>
  );
}

export default Featuredproducts;
