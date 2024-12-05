import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, Footer, LandingPage } from './components/layout'; // Keep only one import statement
import Contact from './pages/contact';
import Profile from './pages/profile';
import Notfound from './pages/notfound';
import ProductList from './pages/admin/products/productlist';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product/create" element={<CreateProduct />} />
        <Route path="/admin/product/edit/:id" element={<EditProduct />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
