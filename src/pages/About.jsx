// pages/About.jsx - Modern Premium Version
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEye, FaUserMd, FaTrophy, FaHeart, 
  FaHandHoldingHeart, FaShieldAlt, FaStar, FaGem,
  FaAward, FaUsers, FaHospitalUser, FaClock,
  FaCheckCircle, FaQuoteLeft, FaArrowRight
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FaUsers />, value: "50,000+", label: "Happy Patients" },
    { icon: <FaUserMd />, value: "15+", label: "Expert Doctors" },
    { icon: <FaTrophy />, value: "100+", label: "Awards Won" },
    { icon: <FaHospitalUser />, value: "98%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: <FaStar />,
      title: "Excellence",
      description: "Striving for the highest standards in eye care delivery with continuous improvement.",
      color: "#f59e0b"
    },
    {
      icon: <FaHeart />,
      title: "Compassion",
      description: "Treating every patient with empathy, dignity, and personalized attention.",
      color: "#ef4444"
    },
    {
      icon: <FaGem />,
      title: "Innovation",
      description: "Adopting the latest technologies and treatments for better outcomes.",
      color: "#8b5cf6"
    },
    {
      icon: <FaShieldAlt />,
      title: "Integrity",
      description: "Maintaining transparency, honesty, and ethical practices in all we do.",
      color: "#10b981"
    }
  ];

  const milestones = [
    { year: "2010", title: "Foundation", description: "Samarth Netralaya was established with a vision to provide quality eye care." },
    { year: "2015", title: "Advanced Technology", description: "Introduced cutting-edge LASIK and cataract surgery equipment." },
    { year: "2020", title: "Expansion", description: "Expanded services to include comprehensive eye care for all ages." },
    { year: "2024", title: "Excellence", description: "Recognized as a leading eye care center in Central India." }
  ];

  return (
    <div className="about-page-modern">
      {/* Hero Section */}
      <section className="about-hero-premium">
        <div className="hero-particles"></div>
        <div className="hero-glow"></div>
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-premium"
          >
            <div className="hero-badge-premium">
              <FaEye className="badge-icon" />
              <span>About Us</span>
            </div>
            <h1 className="hero-title-premium">
              Compassionate <span className="gradient-text">Eye Care</span>
            </h1>
            <div className="hero-line"></div>
            <p className="hero-description-premium">
              Samarth Netralaya is a premier eye care institution dedicated to providing 
              world-class treatment with advanced technology and compassionate care.
            </p>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="hero-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="hero-wave-premium">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container-premium">
          <div className="story-grid">
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop" 
                  alt="Samarth Netralaya"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <FaEye />
                    <span>Excellence in Eye Care</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="story-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="story-badge">Our Story</div>
              <h2>Dedicated to <span>Better Vision</span></h2>
              <p className="story-description">
                Samarth Netralaya was founded with a singular mission: to provide world-class eye care 
                that combines advanced technology with compassionate patient care. Over the years, we've 
                grown into a trusted name in ophthalmology, serving thousands of patients with excellence.
              </p>
              <div className="story-features">
                <div className="story-feature">
                  <FaCheckCircle />
                  <span>Advanced Technology</span>
                </div>
                <div className="story-feature">
                  <FaCheckCircle />
                  <span>Experienced Specialists</span>
                </div>
                <div className="story-feature">
                  <FaCheckCircle />
                  <span>Personalized Care</span>
                </div>
                <div className="story-feature">
                  <FaCheckCircle />
                  <span>Affordable Treatment</span>
                </div>
              </div>
              <button className="story-btn">
                Learn More <FaArrowRight />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section-modern">
        <div className="container-premium">
          <div className="section-header-modern">
            <span className="section-badge">Our Values</span>
            <h2>What We <span>Believe In</span></h2>
            <p>Core principles that guide everything we do</p>
          </div>
          <div className="values-grid-modern">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card-modern"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="value-icon" style={{ background: `${value.color}20`, color: value.color }}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="milestones-section">
        <div className="container-premium">
          <div className="section-header-modern">
            <span className="section-badge">Our Journey</span>
            <h2>Milestones <span>Achieved</span></h2>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container-premium">
          <motion.div
            className="about-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready for Better Vision?</h2>
            <p>Schedule your consultation with our expert eye specialists today</p>
            <div className="cta-buttons">
              <button className="cta-primary">Book Appointment</button>
              <button className="cta-secondary">Contact Us</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;