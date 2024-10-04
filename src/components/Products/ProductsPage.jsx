import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);  // For tracking the selected category

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);  // Update the selected category state
    };

    return (
        <div className="flex flex-col md:flex-row p-5 bg-[#eaeaea] h-auto">
            {/* Sidebar */}
            <Sidebar 
                onCategoryClick={handleCategoryClick}  // Pass the function to Sidebar
                activeCategory={selectedCategory}  // Pass the active category for highlighting
            />

            {/* Main product section */}
            <div className="flex-1 ml-0 md:ml-5 mt-5 md:mt-0">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                {/* Pass selectedCategory to ProductList */}
                <ProductList selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}

export default ProductsPage;
