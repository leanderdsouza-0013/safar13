import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from "./components/HomePage"
import AboutUs from './components/about_us';
import Services from './components/Services';
import FAQs from './components/FAQs';
import ContactUs from './components/Contact-us';
import TermsAndConditions from './components/T&C';
import DashBoard from './components/Dashboard';
import Booking from './components/Booking';
import Rental from './components/Rental';
import Employee from './components/Employee';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthProvider from './components/AuthProvider';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/DashboardAdminPage';
import OperatorPage from './components/OperatorDashBoard';
import AccessError from './components/AccessError';
import { RoutesProvider } from './components/RoutesProvider'; // Import RoutesProvider

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <div>
              <Navbar />
              <div style={{ paddingTop: '20px', paddingBottom: '30px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/services/booking" element={<Booking />} />
                <Route path="/services/rentals" element={<Rental />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/admin_dashboard" element={<AdminPage />} />
                <Route path="/operator_dashboard" element={<OperatorPage />} />
                <Route path="*" element={<AccessError />} />
               
              </Routes> 
              </div>
              <Footer />
            </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
