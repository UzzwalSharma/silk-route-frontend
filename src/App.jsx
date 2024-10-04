import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ProductsPage from './components/Products/ProductsPage';
import ProductDetail from './components/Products/Productdetails';
import CartPage from './components/Cart/Cartpage';
import Cartcomponent from './components/Cart/Cartcomponent';
import LoginForm from './components/Authentication/Loginform';
import SignupForm from './components/Authentication/Signup';
import ForgotPassword from './components/Authentication/Forgetpass';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import ResetPassword from './components/Authentication/ResetPassword';
import Checkout from './components/Checkout';
import 'flowbite';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the paths for each component */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:title" element={<ProductDetail />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/summary" element={<Cartcomponent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Forget" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
