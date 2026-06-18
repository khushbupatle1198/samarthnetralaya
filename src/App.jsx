// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Media from './pages/Media';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';

// Admin imports
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAppointments from './components/admin/AdminAppointments';
import AdminPatients from './components/admin/AdminPatients';
import AdminDoctors from './components/admin/AdminDoctors';
import AdminProfile from './components/admin/AdminProfile';
import AdminSettings from './components/admin/AdminSettings';
import AdminHero from './components/admin/AdminHero';
import AdminFacilities from './components/admin/AdminFacilities';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminServices from './components/admin/AdminServices';
import AdminBlogs  from './components/admin/AdminBlogs';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute>
            <AdminAppointments />
          </ProtectedRoute>
        } />
        <Route path="/admin/patients" element={
          <ProtectedRoute>
            <AdminPatients />
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute>
            <AdminDoctors />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        } />

        <Route path="/admin/hero" element={
       <ProtectedRoute>
         <AdminHero />
       </ProtectedRoute>
        } />

        <Route path="/admin/facilities" element={
       <ProtectedRoute>
         <AdminFacilities />
       </ProtectedRoute>
        } />

        <Route path="/admin/services" element={
       <ProtectedRoute>
         <AdminServices />
       </ProtectedRoute>
        } />

        <Route path="/admin/blogs" element={
       <ProtectedRoute>
         <AdminBlogs />
       </ProtectedRoute>
        } />



        {/* User Routes - With Navbar/Footer */}
        <Route path="/" element={
          <div className="app">
            <Navbar />
            <main>
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="app">
            <Navbar />
            <main>
              <Services />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/media" element={
          <div className="app">
            <Navbar />
            <main>
              <Media />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="app">
            <Navbar />
            <main>
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="app">
            <Navbar />
            <main>
              <Contact />
            </main>
            <Footer />
          </div>
        } />

  // App.jsx - Update blog routes
<Route path="/blogs" element={
  <div className="app">
    <Navbar />
    <main>
      <Blogs />
    </main>
    <Footer />
  </div>
} />
<Route path="/blog/:slug" element={
  <div className="app">
    <Navbar />
    <main>
      <BlogDetail />
    </main>
    <Footer />
  </div>
} />

        <Route path="/appointment" element={
          <div className="app">
            <Navbar />
            <main>
              <Appointment />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/gallery" element={
          <div className="app">
            <Navbar />
            <main>
              <Gallery />
            </main>
            <Footer />
          </div>
        } />

        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;