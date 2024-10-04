import React from 'react';
import Hero from '/src/components/Home/Hero'; // Correct path to Hero
import iPhoneImage from "/src/assets/iphone-14-pro.webp";
import macimg from "/src/assets/mac-system-cut.png";
import Featuredproducts from './Featuredproducts';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero section for iPhone */}
      <Hero 
        title="Experience the Future with iPhone 14 Pro" 
        subtitle="The iPhone 14 Pro redefines innovation with its stunning 6.1 Super Retina XDR display, the most advanced Pro camera system ever, and an all-day battery. Capture stunning images, enjoy blazing-fast performance, and explore the future of smartphones today." 
        image={iPhoneImage} 
        link="/product"
        className="transition-transform duration-500 ease-in-out transform hover:scale-105" // Adding hover effect
      />

      {/* Featured Products Section */}
      <div className="py-16 px-4">
        
        <Featuredproducts />
      </div>

      {/* Hero section for Mac */}
      <Hero 
        title="Craft Your Perfect Workspace with Mac" 
        subtitle="Power up with the latest Mac system, engineered for performance, precision, and productivity. Create your ultimate setup and redefine your workflow with unmatched speed and style." 
        image={macimg} 
        link="/product"
        className="transition-transform duration-500 ease-in-out transform hover:scale-105" // Adding hover effect
      />

      {/* Testimonials Section */}
      <section className="py-16 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Example testimonials */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-600">“The iPhone 14 Pro has transformed my photography! The camera is simply outstanding.”</p>
            <p className="mt-4 font-semibold">— Sarah K.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-600">“Switching to Mac was the best decision I've made for my work. It's fast and efficient!”</p>
            <p className="mt-4 font-semibold">— John D.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-600">“I love the seamless experience of using Apple products together. Highly recommend!”</p>
            <p className="mt-4 font-semibold">— Emily R.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
