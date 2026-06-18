// pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Samarth Netralaya
          </motion.h1>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <motion.div
            className="vision-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Vision</h2>
            <p>To be the most trusted eye care provider in Central India, offering world-class treatment with compassion and excellence.</p>
          </motion.div>

          <motion.div
            className="mission-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Mission</h2>
            <p>To provide accessible, affordable, and advanced eye care services to every individual, utilizing cutting-edge technology and patient-centered approaches.</p>
          </motion.div>

          <motion.div
            className="values-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Excellence</h3>
                <p>Striving for the highest standards in eye care delivery.</p>
              </div>
              <div className="value-card">
                <h3>Compassion</h3>
                <p>Treating every patient with empathy and care.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>Adopting the latest technologies and treatments.</p>
              </div>
              <div className="value-card">
                <h3>Integrity</h3>
                <p>Maintaining transparency and ethical practices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;