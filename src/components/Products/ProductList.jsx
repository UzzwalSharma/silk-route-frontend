import React, { useState, useEffect } from "react";
import ProductCards from "/src/components/Home/ProductCards.jsx";
import apiClient from "../../utils/api-client";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [limit] = useState(10); // items per page
  const [totalPages, setTotalPages] = useState(1); // total number of pages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/products", {
          params: {
            category: selectedCategory,
            page,
            limit,
          },
        });

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages); // Assuming API sends total pages
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <ProductCards
                key={product._id}
                id={product._id}
                image={product.images[0]}
                price={product.price}
                title={product.title}
                rating={product.reviews.rate}
                ratingCounts={product.reviews.counts}
                stock={product.stock}
              />
            ))
          ) : (
            <p>No products available</p>
          )
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400"
          }`}
        >
          Previous
        </button>
        <span className="font-medium text-lg text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            page === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
