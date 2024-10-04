import React from 'react';
import "./Hero.css";


function Hero({title,link,subtitle,image}) {
  return (
    <div className="custom-container mx-auto px-4 text-center">
      {/* Text Section */}
      <section className="text-section">
        <h1 className="hero-title text-4xl font-bold text-white mb-6">
        {title}
         
        </h1>
        <p className="hero-description text-lg text-gray-300 mb-8">
            {subtitle}
          
        </p>
        <a href={link}>
        <button class="button">
  BUY NOW
</button>
        </a>
        

      </section>
      
      {/* Image Section with 3D effect */}
      <section className="image-section mt-8">
        <img src={image} alt="iPhone 14 Pro" className="product-image" />
      </section>
    </div>
  );
}

export default Hero;
