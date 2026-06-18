// pages/Services.jsx - Static Version
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaStethoscope, FaAmbulance, FaMicroscope, FaLaptopMedical, FaHeartbeat, FaChevronRight } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState(location.state?.selectedService || null);

  const servicesList = [
    { name: "Refractive Surgery", icon: <FaEye />, description: "Advanced laser vision correction procedures." },
    { name: "Cornea", icon: <FaEye />, description: "Treatment for corneal disorders and diseases." },
    { name: "Cataract", icon: <FaEye />, description: "Painless cataract removal with premium lens." },
    { name: "Vitreous, Retina, & Uvea", icon: <FaMicroscope />, description: "Advanced retinal and vitreous treatments." },
    { name: "ROP Screening", icon: <FaEye />, description: "Screening for premature infants." },
    { name: "Glaucoma", icon: <FaEye />, description: "Early detection and management of glaucoma." },
    { name: "Paediatric Eye Care", icon: <FaEye />, description: "Specialized care for children's vision." },
    { name: "Occuloplasty", icon: <FaEye />, description: "Eyelid and orbital surgery." },
    { name: "Neuropthalmology", icon: <FaEye />, description: "Eye problems related to nervous system." },
    { name: "Dry Eye Management", icon: <FaEye />, description: "Comprehensive dry eye treatment." },
    { name: "Eye Banking", icon: <FaEye />, description: "Cornea collection and transplantation." },
    { name: "Low Vision Aids", icon: <FaEye />, description: "Vision rehabilitation and aids." },
    { name: "Diabetic Eye Care", icon: <FaStethoscope />, description: "Diabetes-related eye complications." },
    { name: "Retinal Screening", icon: <FaMicroscope />, description: "Advanced retinal examination." },
    { name: "Telemedicine Services", icon: <FaLaptopMedical />, description: "Remote consultations available." },
    { name: "Eye Emergencies", icon: <FaAmbulance />, description: "24/7 emergency eye care." }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>Our Services</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Comprehensive eye care services under one roof</motion.p>
        </div>
      </section>

      <section className="services-list-section">
        <div className="container">
          <div className="services-grid-full">
            {servicesList.map((service, index) => (
              <motion.div key={index} className={`service-item ${selectedService === service.name ? 'active' : ''}`} whileHover={{ scale: 1.02 }} onClick={() => setSelectedService(service.name)}>
                <div className="service-item-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;