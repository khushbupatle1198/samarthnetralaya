// pages/Appointment.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Appointment.css';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    "Refractive Surgery",
    "Cornea",
    "Cataract",
    "Vitreous, Retina, & Uvea",
    "ROP Screening",
    "Glaucoma",
    "Paediatric Eye Care",
    "Occuloplasty",
    "Neuropthalmology",
    "Dry Eye Management",
    "Eye Banking",
    "Low Vision Aids & Prosthetics",
    "Diabetic Eye Care",
    "Retinal Screening",
    "Telemedicine Services",
    "Eye Emergencies"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
    alert('Appointment request submitted successfully! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  return (
    <div className="appointment-page">
      <section className="appointment-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Book an Appointment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Schedule your consultation with our expert eye specialists
          </motion.p>
        </div>
      </section>

      <section className="appointment-form-section">
        <div className="container">
          <motion.div
            className="appointment-form-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Select Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="evening">Evening (3:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific concerns or questions?"
                ></textarea>
              </div>

              <button type="submit" className="book-btn">Book Appointment</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;