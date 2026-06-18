// Home.jsx - Premium Edition with Elegant Animations
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaStethoscope, 
  FaEye, 
  FaAmbulance, 
  FaUserMd, 
  FaMicroscope, 
  FaStar, 
  FaQuoteLeft,
  FaLaptopMedical,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaGraduationCap,
  FaTrophy,
  FaPhone,
  FaEnvelope,
  FaCircle,
  FaHeartbeat,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaClock,
  FaHospitalUser,
  FaAward,
  FaHandHoldingHeart,
  FaRegGem,
  FaShieldAlt,
  FaRocket,
  FaInfinity,
  FaRegSun,
  FaLeaf,
  FaSpa,
  FaStarOfLife,
  FaDove,
  FaFeatherAlt,
  FaGem,
  FaCrown
} from 'react-icons/fa';
import { GiHealing, GiHealthNormal, GiMeditation, GiFlowerPot } from 'react-icons/gi';
import API_CONFIG from '../config/apiConfig';
import HeroSection from './HeroSection';
import './Home.css';

const DEFAULT_DOCTOR_IMAGE = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop";
const DEFAULT_FACILITY_IMAGE = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop";

const getIconComponent = (iconName) => {
  const icons = {
    FaAmbulance: <FaAmbulance />,
    FaMicroscope: <FaMicroscope />,
    FaLaptopMedical: <FaLaptopMedical />,
    FaEye: <FaEye />,
    FaStethoscope: <FaStethoscope />,
    FaHeartbeat: <FaHeartbeat />,
    FaRegGem: <FaRegGem />,
    FaShieldAlt: <FaShieldAlt />,
    FaRocket: <FaRocket />,
    FaInfinity: <FaInfinity />
  };
  return icons[iconName] || <FaEye />;
};

const Home = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);
  const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);
  const [isFacilityAutoPlaying, setIsFacilityAutoPlaying] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    fetchFacilities();
    fetchDoctors();
  }, []);

  const fetchFacilities = async () => {
    try {
      setFacilitiesLoading(true);
      const response = await fetch(`${BASE_URL}/api/facilities/active`);
      const data = await response.json();
      setFacilities(data.length ? data : fallbackFacilities);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setFacilities(fallbackFacilities);
    } finally {
      setFacilitiesLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setDoctorsLoading(true);
      const response = await fetch(`${BASE_URL}/api/doctors/all`);
      const data = await response.json();
      setDoctors(data.length ? data : mockDoctors);
      setError(null);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors(mockDoctors);
    } finally {
      setDoctorsLoading(false);
    }
  };

  useEffect(() => {
    if (isHeroInView) {
      controls.start('visible');
    }
  }, [controls, isHeroInView]);

  useEffect(() => {
    let interval;
    if (isFacilityAutoPlaying && facilities.length > 1) {
      interval = setInterval(() => {
        nextFacility();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentFacilityIndex, isFacilityAutoPlaying, facilities.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && doctors.length > 1) {
      interval = setInterval(() => {
        nextDoctor();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentDoctorIndex, isAutoPlaying, doctors.length]);

  const nextFacility = () => {
    if (facilities.length > 0) {
      setCurrentFacilityIndex((prev) => (prev + 1) % facilities.length);
    }
  };

  const prevFacility = () => {
    if (facilities.length > 0) {
      setCurrentFacilityIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
    }
  };

  const goToFacility = (index) => {
    setCurrentFacilityIndex(index);
    setIsFacilityAutoPlaying(false);
    setTimeout(() => setIsFacilityAutoPlaying(true), 10000);
  };

  const nextDoctor = () => {
    if (doctors.length > 0) {
      setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
    }
  };

  const prevDoctor = () => {
    if (doctors.length > 0) {
      setCurrentDoctorIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    }
  };

  const goToDoctor = (index) => {
    setCurrentDoctorIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const achievements = [
    { icon: <GiHealing />, value: "25+", label: "Years Excellence", color: "#e8a87c" },
    { icon: <FaHospitalUser />, value: "50K+", label: "Happy Patients", color: "#d8a47f" },
    { icon: <FaUserMd />, value: "30+", label: "Expert Doctors", color: "#c9977a" },
    { icon: <FaTrophy />, value: "100+", label: "Awards Won", color: "#ba8a73" }
  ];

  const services = [
    { name: "Comprehensive Eye Checkup", icon: <FaEye />, description: "Complete vision assessment with advanced diagnostic technology" },
    { name: "Cataract Surgery", icon: <FaStarOfLife />, description: "Painless micro-incision surgery with premium lens implants" },
    { name: "Glaucoma Treatment", icon: <GiHealthNormal />, description: "Early detection and advanced management for vision protection" },
    { name: "Pediatric Eye Care", icon: <GiMeditation />, description: "Specialized gentle care for children's vision health" },
    { name: "LASIK Surgery", icon: <FaRegSun />, description: "Blade-free laser vision correction for freedom from glasses" },
    { name: "Emergency Care", icon: <FaAmbulance />, description: "24/7 specialized emergency services for critical conditions" }
  ];

  const testimonials = [
    {
      name: "Shefali Meshram",
      rating: 5,
      text: "Very neat and clean hospital. Very nice staff. Dr. Aron sir is best. One of the best Dr in Nagpur.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      location: "Nagpur"
    },
    {
      name: "Anuradha Mitra",
      rating: 5,
      text: "Very pleasant hospital. Doctors and the staff here are so patient friendly. Most importantly the treatment is superb.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      location: "Mumbai"
    },
    {
      name: "Kinjal Shah",
      rating: 5,
      text: "It's an example of State of Art Above and Beyond. Truly inspiring vision for patients of Nagpur.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      location: "Pune"
    }
  ];

  const currentDoctor = doctors[currentDoctorIndex];
  const currentFacility = facilities[currentFacilityIndex];

  return (
    <div className="home">
      <HeroSection />

      {/* Premium Facilities Carousel */}
      <section className="premium-facilities-section">
        <div className="container">
          <motion.div 
            className="section-header-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-badge-premium">
              <FaGem className="badge-gem" />
              Premium Facilities
            </span>
            <h2 className="section-title-premium">
              World-Class <span className="gradient-text-gold">Infrastructure</span>
            </h2>
            <div className="title-ornament">
              <FaFeatherAlt className="ornament-icon" />
              <div className="ornament-line"></div>
              <FaFeatherAlt className="ornament-icon" />
            </div>
            <p className="section-subtitle-premium">
              Experience excellence with our state-of-the-art facilities designed for superior eye care
            </p>
          </motion.div>
          
          {facilitiesLoading ? (
            <div className="premium-loading">
              <div className="elegant-spinner">
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
              </div>
              <p>Loading premium facilities...</p>
            </div>
          ) : facilities.length === 0 ? (
            <div className="premium-empty">
              <p>No facilities available</p>
            </div>
          ) : (
            <div className="premium-carousel-container">
              {facilities.length > 1 && (
                <>
                  <button className="carousel-nav-btn prev-btn" onClick={prevFacility}>
                    <FaChevronLeft />
                  </button>
                  <button className="carousel-nav-btn next-btn" onClick={nextFacility}>
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div className="premium-carousel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFacilityIndex}
                    className="premium-facility-card"
                    initial={{ opacity: 0, scale: 0.9, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  >
                    <div className="facility-card-glow"></div>
                    <div className="facility-premium-grid">
                      <div className="facility-image-premium">
                        <div className="image-wrapper-premium">
                          {currentFacility?.imagePath ? (
                            <img 
                              src={`${BASE_URL}${currentFacility.imagePath}`} 
                              alt={currentFacility.title}
                              className="facility-premium-img"
                            />
                          ) : (
                            <div className="facility-icon-premium-large">
                              {getIconComponent(currentFacility?.iconName)}
                            </div>
                          )}
                          <div className="image-overlay-premium">
                            <div className="overlay-content-premium">
                              <FaHandHoldingHeart className="overlay-icon-premium" />
                              <span>Excellence in Care</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="facility-content-premium">
                        <div className="content-header-premium">
                          <span className="facility-number-premium">
                            {(currentFacilityIndex + 1).toString().padStart(2, '0')}
                          </span>
                          <div className="premium-tag">
                            <FaCrown className="premium-crown" />
                            <span>Premium Service</span>
                          </div>
                        </div>
                        
                        <h3>{currentFacility?.title}</h3>
                        <p className="facility-description-premium">
                          {currentFacility?.description}
                        </p>
                        
                        <div className="facility-highlights">
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <GiHealthNormal />
                            </div>
                            <span>Advanced Technology</span>
                          </div>
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <FaUserMd />
                            </div>
                            <span>Expert Care</span>
                          </div>
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <FaHandHoldingHeart />
                            </div>
                            <span>Personalized Service</span>
                          </div>
                        </div>
                        
                        <div className="facility-details-premium">
                          <p>{currentFacility?.detailedDescription || currentFacility?.description}</p>
                        </div>
                        
                        <button className="learn-more-premium">
                          Discover More
                          <FaChevronRight className="learn-icon" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {facilities.length > 1 && (
                <div className="carousel-progress-premium">
                  <div className="progress-steps">
                    {facilities.map((_, index) => (
                      <button
                        key={index}
                        className={`progress-step ${index === currentFacilityIndex ? 'active' : ''}`}
                        onClick={() => goToFacility(index)}
                      >
                        <span className="step-number">{index + 1}</span>
                        <div className="step-line"></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-premium-section">
        <div className="container">
          <motion.div 
            className="section-header-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-badge-premium">
              <FaLeaf className="badge-gem" />
              Our Services
            </span>
            <h2 className="section-title-premium">
              Comprehensive <span className="gradient-text-gold">Eye Care</span>
            </h2>
            <div className="title-ornament">
              <FaFeatherAlt className="ornament-icon" />
              <div className="ornament-line"></div>
              <FaFeatherAlt className="ornament-icon" />
            </div>
            <p className="section-subtitle-premium">
              Complete range of specialized eye care services under one roof
            </p>
          </motion.div>

          <div className="services-premium-grid">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="service-premium-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="service-card-inner">
                  <div className="service-icon-premium">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-hover-effect">
                    <FaChevronRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Counter Section */}
      <section className="achievements-premium-section">
        <div className="achievements-bg"></div>
        <div className="container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="achievement-premium-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="achievement-icon" style={{ color: achievement.color }}>
                  {achievement.icon}
                </div>
                <h3 className="achievement-value">{achievement.value}</h3>
                <p className="achievement-label">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Slider Section */}
      <section className="doctors-premium-section">
        <div className="container">
          <motion.div 
            className="section-header-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-badge-premium">
              <FaUserMd className="badge-gem" />
              Our Specialists
            </span>
            <h2 className="section-title-premium">
              Meet Our <span className="gradient-text-gold">Expert Doctors</span>
            </h2>
            <div className="title-ornament">
              <FaFeatherAlt className="ornament-icon" />
              <div className="ornament-line"></div>
              <FaFeatherAlt className="ornament-icon" />
            </div>
            <p className="section-subtitle-premium">
              Dedicated professionals committed to your eye health
            </p>
          </motion.div>

          {doctorsLoading ? (
            <div className="premium-loading">
              <div className="elegant-spinner">
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
              </div>
              <p>Loading specialists...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="premium-empty">
              <p>No doctors available</p>
            </div>
          ) : (
            <div className="doctor-premium-slider">
              {doctors.length > 1 && (
                <>
                  <button className="doctor-nav-btn prev-doctor" onClick={prevDoctor}>
                    <FaChevronLeft />
                  </button>
                  <button className="doctor-nav-btn next-doctor" onClick={nextDoctor}>
                    <FaChevronRight />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDoctorIndex}
                  className="doctor-premium-card"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="doctor-premium-grid">
                    <div className="doctor-image-premium">
                      <div className="doctor-image-wrapper">
                        {currentDoctor?.imagePath ? (
                          <img 
                            src={`${BASE_URL}${currentDoctor.imagePath}`} 
                            alt={currentDoctor.name}
                            className="doctor-premium-img"
                          />
                        ) : (
                          <div className="doctor-placeholder-premium">
                            <FaUserMd />
                          </div>
                        )}
                        <div className="doctor-social-premium">
                          <div className="social-links">
                            <a href="#" className="social-link">📧</a>
                            <a href="#" className="social-link">💬</a>
                            <a href="#" className="social-link">📞</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="doctor-info-premium">
                      <div className="doctor-header-premium">
                        <div>
                          <h3>{currentDoctor?.name}</h3>
                          <p className="doctor-specialty">{currentDoctor?.title || currentDoctor?.name}</p>
                          <p className="doctor-qualification">{currentDoctor?.qualification}</p>
                        </div>
                        <div className="doctor-rating">
                          <FaStar className="rating-star" />
                          <span>{currentDoctor?.rating || '4.9'}</span>
                        </div>
                      </div>
                      
                      <div className="doctor-stats-premium">
                        <div className="doctor-stat">
                          <FaClock />
                          <span>{currentDoctor?.experience || '15+'} Years</span>
                        </div>
                        <div className="doctor-stat">
                          <FaHospitalUser />
                          <span>{currentDoctor?.patients || '5000'}+ Patients</span>
                        </div>
                      </div>
                      
                      <p className="doctor-bio-premium">
                        {currentDoctor?.bio || currentDoctor?.description || "Renowned ophthalmologist with extensive experience in advanced eye care procedures and patient-centered treatment approaches."}
                      </p>
                      
                      <div className="doctor-credentials">
                        {currentDoctor?.education && (
                          <div className="credential">
                            <FaGraduationCap />
                            <span>{currentDoctor.education}</span>
                          </div>
                        )}
                        {currentDoctor?.achievements && (
                          <div className="credential">
                            <FaTrophy />
                            <span>{currentDoctor.achievements}</span>
                          </div>
                        )}
                      </div>
                      
                      <button className="book-btn-premium">
                        <FaCalendarCheck />
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {doctors.length > 1 && (
                <div className="doctor-dots-premium">
                  {doctors.map((_, index) => (
                    <button
                      key={index}
                      className={`doctor-dot ${index === currentDoctorIndex ? 'active' : ''}`}
                      onClick={() => goToDoctor(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-premium-section">
        <div className="container">
          <motion.div 
            className="section-header-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-badge-premium">
              <FaQuoteLeft className="badge-gem" />
              Testimonials
            </span>
            <h2 className="section-title-premium">
              What Our <span className="gradient-text-gold">Patients Say</span>
            </h2>
            <div className="title-ornament">
              <FaFeatherAlt className="ornament-icon" />
              <div className="ornament-line"></div>
              <FaFeatherAlt className="ornament-icon" />
            </div>
            <p className="section-subtitle-premium">
              Real stories from our valued patients
            </p>
          </motion.div>

          <div className="testimonials-premium-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-premium-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FaQuoteLeft className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="testimonial-star" />
                  ))}
                </div>
                <p className="testimonial-text-premium">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="location-premium-section">
        <div className="container">
          <motion.div 
            className="location-premium-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="location-premium-grid">
              <div className="location-info-premium">
                <div className="info-badge">
                  <FaMapMarkerAlt />
                  <span>Visit Us</span>
                </div>
                <h2>Conveniently Located for Your Care</h2>
                <div className="contact-details-premium">
                  <div className="contact-detail">
                    <div className="detail-icon"><FaMapMarkerAlt /></div>
                    <div>
                      <h4>Address</h4>
                      <p>123, Healthcare District, Nagpur, Maharashtra - 440001</p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="detail-icon"><FaPhone /></div>
                    <div>
                      <h4>Phone</h4>
                      <p>+91 9960198199</p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="detail-icon"><FaEnvelope /></div>
                    <div>
                      <h4>Email</h4>
                      <p>info@samarthnetralaya.com</p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="detail-icon"><FaClock /></div>
                    <div>
                      <h4>Working Hours</h4>
                      <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                      <p>Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>
                <button className="direction-btn-premium">
                  Get Directions <FaChevronRight />
                </button>
              </div>
              <div className="location-map-premium">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.123456789012!2d79.084569!3d21.145823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e5e5e5e5e5%3A0x1234567890abcdef!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Clinic Location"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Fallback facilities
const fallbackFacilities = [
  {
    id: 1,
    title: "Advanced Diagnostic Center",
    description: "State-of-the-art diagnostic equipment for precise eye examinations and early disease detection.",
    detailedDescription: "Our diagnostic center features OCT, Fundus Camera, Visual Field Analyzer, and advanced imaging technology for accurate diagnosis of all eye conditions.",
    iconName: "FaMicroscope",
    imagePath: null
  },
  {
    id: 2,
    title: "Laser Vision Correction",
    description: "Cutting-edge LASIK and refractive surgery for crystal clear vision without glasses.",
    detailedDescription: "Experience freedom from glasses with our advanced bladeless LASIK procedures using German technology for optimal results.",
    iconName: "FaLaptopMedical",
    imagePath: null
  },
  {
    id: 3,
    title: "Cataract Excellence Center",
    description: "Advanced phacoemulsification surgery for painless cataract removal.",
    detailedDescription: "Micro-incision cataract surgery with premium lens implants for the best possible visual outcomes.",
    iconName: "FaEye",
    imagePath: null
  },
  {
    id: 4,
    title: "Glaucoma Care Center",
    description: "Specialized care for glaucoma management and vision preservation.",
    detailedDescription: "Comprehensive glaucoma care including early detection, medical management, laser treatment, and surgical interventions.",
    iconName: "FaStethoscope",
    imagePath: null
  }
];

const mockDoctors = [
  { 
    id: 1, 
    name: "Dr. Krishna Bhojwani", 
    title: "Senior Ophthalmologist",
    qualification: "MBBS, MS - Ophthalmology",
    bio: "With over 15 years of experience in advanced eye care and microsurgery.",
    description: "Renowned ophthalmologist specializing in cataract and refractive surgery.",
    experience: "15+",
    rating: 4.9,
    patients: 5000,
    email: "krishna@samarth.com",
    phone: "9890374024",
    imagePath: null
  },
  { 
    id: 2, 
    name: "Dr. Sneha Deshmukh", 
    title: "Cataract Specialist",
    qualification: "MBBS, DNB, FICO",
    bio: "Expert in advanced cataract surgery with premium lens implants.",
    description: "Specialized in painless cataract surgery and post-operative care.",
    experience: "10+",
    rating: 4.8,
    patients: 3500,
    email: "sneha@samarth.com",
    phone: "9876543211",
    imagePath: null
  }
];

export default Home;