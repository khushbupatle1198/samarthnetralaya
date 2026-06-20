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
  FaGraduationCap,
  FaTrophy,
  FaPhone,
  FaEnvelope,
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
  FaStarOfLife,
  FaFeatherAlt,
  FaGem,
  FaCrown
} from 'react-icons/fa';
import { 
  GiHealing, 
  GiHealthNormal, 
  GiMeditation, 
  GiEyeOfHorus, 
  GiEyeTarget,
  GiFlowerPot,
  GiHeartPlus,
  GiHumanTarget,
  GiSightDisabled
} from 'react-icons/gi';
import API_CONFIG from '../config/apiConfig';
import HeroSection from './HeroSection';
import './Home.css';

const DEFAULT_DOCTOR_IMAGE = "/images/doctor.png";

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
    FaInfinity: <FaInfinity />,
    GiEyeOfHorus: <GiEyeOfHorus />,
    GiEyeTarget: <GiEyeTarget />,
    GiHealing: <GiHealing />,
    GiHealthNormal: <GiHealthNormal />
  };
  return icons[iconName] || <FaEye />;
};

const Home = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);
  const [isFacilityAutoPlaying, setIsFacilityAutoPlaying] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);

  const BASE_URL = API_CONFIG.BASE_URL;

  // Single doctor data
  const doctor = {
    id: 1,
    name: "Dr. Krishna Bhojwani",
    title: "MBBS / Ophthalmologist",
    qualification: "MBBS, MS - Ophthalmology",
    specialty: "Senior Ophthalmologist & Eye Surgeon",
    bio: "Seasoned ophthalmologist with a robust background in eye care and surgery. Committed to delivering high-quality patient care and innovative treatments. With over 15 years of experience, Dr. Bhojwani has transformed thousands of lives through advanced eye care procedures.",
    description: "Renowned ophthalmologist specializing in cataract, refractive surgery, and comprehensive eye care.",
    experience: "15+ Years",
    rating: 4.9,
    patients: 5000,
    email: "krishna@samarthnetralaya.com",
    phone: "+91 9890374024",
    education: "MBBS, MS - Ophthalmology, FICO",
    achievements: "Gold Medalist • 1000+ Successful Surgeries",
    imagePath: "/images/doctor.png"
  };

  // Facilities with online images
  const fallbackFacilities = [
    {
      id: 1,
      title: "Advanced Diagnostic Center",
      description: "State-of-the-art diagnostic equipment for precise eye examinations and early disease detection.",
      detailedDescription: "Our diagnostic center features OCT, Fundus Camera, Visual Field Analyzer, and advanced imaging technology for accurate diagnosis of all eye conditions.",
      iconName: "GiEyeOfHorus",
      imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Laser Vision Correction",
      description: "Cutting-edge LASIK and refractive surgery for crystal clear vision without glasses.",
      detailedDescription: "Experience freedom from glasses with our advanced bladeless LASIK procedures using German technology for optimal results.",
      iconName: "GiEyeTarget",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Cataract Excellence Center",
      description: "Advanced phacoemulsification surgery for painless cataract removal.",
      detailedDescription: "Micro-incision cataract surgery with premium lens implants for the best possible visual outcomes.",
      iconName: "GiHealing",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Glaucoma Care Center",
      description: "Specialized care for glaucoma management and vision preservation.",
      detailedDescription: "Comprehensive glaucoma care including early detection, medical management, laser treatment, and surgical interventions.",
      iconName: "FaShieldAlt",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop"
    }
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setFacilitiesLoading(true);
      const response = await fetch(`${BASE_URL}/api/facilities/active`);
      const data = await response.json();
      const facilitiesWithImages = data.length ? data.map((item, index) => ({
        ...item,
        imageUrl: fallbackFacilities[index % fallbackFacilities.length]?.imageUrl || 
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop"
      })) : fallbackFacilities;
      setFacilities(facilitiesWithImages);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setFacilities(fallbackFacilities);
    } finally {
      setFacilitiesLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isFacilityAutoPlaying && facilities.length > 1) {
      interval = setInterval(() => {
        nextFacility();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentFacilityIndex, isFacilityAutoPlaying, facilities.length]);

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

  const achievements = [
    { icon: <GiHealing />, value: "25+", label: "Years Excellence", color: "#d4a373" },
    { icon: <FaHospitalUser />, value: "50K+", label: "Happy Patients", color: "#c9977a" },
    { icon: <FaUserMd />, value: "30+", label: "Expert Doctors", color: "#ba8a73" },
    { icon: <FaTrophy />, value: "100+", label: "Awards Won", color: "#a87a63" }
  ];

  const services = [
    { 
      name: "Comprehensive Eye Checkup", 
      icon: <FaEye />, 
      description: "Complete vision assessment with advanced diagnostic technology",
      image: "/images/services/Comprehensive Eye Checkup.jpg"
    },
    { 
      name: "Cataract Surgery", 
      icon: <FaStarOfLife />, 
      description: "Painless micro-incision surgery with premium lens implants",
      image: "/images/services/Cataract Surgery.jpg"
    },
    { 
      name: "Glaucoma Treatment", 
      icon: <GiHealthNormal />, 
      description: "Early detection and advanced management for vision protection",
      image: "/images/services/Glaucoma Treatment.jpg"
    },
    { 
      name: "Pediatric Eye Care", 
      icon: <GiMeditation />, 
      description: "Specialized gentle care for children's vision health",
      image: "/images/services/Pediatric Eye Care.jpg"
    },
    { 
      name: "LASIK Surgery", 
      icon: <FaRegSun />, 
      description: "Blade-free laser vision correction for freedom from glasses",
      image: "/images/services/LASIK Surgery.jpg"
    },
    { 
      name: "Emergency Care", 
      icon: <FaAmbulance />,  
      description: "24/7 specialized emergency services for critical conditions",
      image: "/images/services/Emergency Care.jpg"
    }
  ];

  // Testimonials without images - only message and full name
  const testimonials = [
    {
      name: "Shefali Meshram",
      rating: 5,
      text: "Very neat and clean hospital. Very nice staff. Dr. Aron sir is best. One of the best Dr in Nagpur.",
      location: "Nagpur"
    },
    {
      name: "Anuradha Mitra",
      rating: 5,
      text: "Very pleasant hospital. Doctors and the staff here are so patient friendly. Most importantly the treatment is superb.",
      location: "Mumbai"
    },
    {
      name: "Kinjal Shah",
      rating: 5,
      text: "It's an example of State of Art Above and Beyond. Truly inspiring vision for patients of Nagpur.",
      location: "Pune"
    }
  ];

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
                          {currentFacility?.imageUrl ? (
                            <img 
                              src={currentFacility.imageUrl} 
                              alt={currentFacility.title}
                              className="facility-premium-img"
                            />
                          ) : currentFacility?.imagePath ? (
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

      {/* Services Grid Section with Images */}
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
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.name} className="service-image" />
                  <div className="service-overlay">
                    <div className="service-icon-premium">{service.icon}</div>
                  </div>
                </div>
                <div className="service-card-inner">
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

      {/* Single Doctor Section */}
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
              Our Specialist
            </span>
            <h2 className="section-title-premium">
              Meet Our <span className="gradient-text-gold">Expert Doctor</span>
            </h2>
            <div className="title-ornament">
              <FaFeatherAlt className="ornament-icon" />
              <div className="ornament-line"></div>
              <FaFeatherAlt className="ornament-icon" />
            </div>
            <p className="section-subtitle-premium">
              Dedicated professional committed to your eye health
            </p>
          </motion.div>

          <motion.div
            className="doctor-premium-single"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="doctor-premium-card-single">
              <div className="doctor-card-glow"></div>
              <div className="doctor-premium-grid-single">
                <div className="doctor-image-premium-single">
                  <div className="doctor-image-wrapper-single">
                    <img 
                      src={doctor.imagePath} 
                      alt={doctor.name}
                      className="doctor-premium-img-single"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop";
                      }}
                    />
                    <div className="doctor-social-premium-single">
                      <div className="social-links-single">
                        <a href="#" className="social-link-single" aria-label="Email">
                          <FaEnvelope />
                        </a>
                        <a href="#" className="social-link-single" aria-label="Phone">
                          <FaPhone />
                        </a>
                        <a href="#" className="social-link-single" aria-label="Calendar">
                          <FaCalendarCheck />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="doctor-info-premium-single">
                  <div className="doctor-header-premium-single">
                    <div>
                      <div className="doctor-title-badge">
                        <FaStar className="badge-star" />
                        <span>Top Specialist</span>
                      </div>
                      <h3>{doctor.name}</h3>
                      <p className="doctor-specialty-single">{doctor.title}</p>
                      <p className="doctor-qualification-single">{doctor.qualification}</p>
                    </div>
                    <div className="doctor-rating-single">
                      <FaStar className="rating-star-single" />
                      <span>{doctor.rating}</span>
                      <span className="rating-label">/ 5.0</span>
                    </div>
                  </div>
                  
                  <div className="doctor-stats-premium-single">
                    <div className="doctor-stat-single">
                      <FaClock className="stat-icon" />
                      <div>
                        <span className="stat-value">{doctor.experience}</span>
                        <span className="stat-label">Experience</span>
                      </div>
                    </div>
                    <div className="doctor-stat-single">
                      <FaHospitalUser className="stat-icon" />
                      <div>
                        <span className="stat-value">{doctor.patients}+</span>
                        <span className="stat-label">Happy Patients</span>
                      </div>
                    </div>
                    <div className="doctor-stat-single">
                      <FaTrophy className="stat-icon" />
                      <div>
                        <span className="stat-value">1000+</span>
                        <span className="stat-label">Surgeries</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="doctor-bio-premium-single">
                    {doctor.bio}
                  </p>
                  
                  <div className="doctor-credentials-single">
                    <div className="credential-single">
                      <FaGraduationCap className="credential-icon" />
                      <span>{doctor.education}</span>
                    </div>
                    <div className="credential-single">
                      <FaAward className="credential-icon" />
                      <span>{doctor.achievements}</span>
                    </div>
                  </div>
                  
                  <button className="book-btn-premium-single">
                    <FaCalendarCheck />
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Without Images */}
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
                <div className="testimonial-quote-icon-wrapper">
                  <FaQuoteLeft className="testimonial-quote-icon" />
                </div>
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="testimonial-star" />
                  ))}
                </div>
                <p className="testimonial-text-premium">"{testimonial.text}"</p>
                <div className="testimonial-author-no-image">
                  <div className="author-initial">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info-no-image">
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

export default Home;