// pages/Services.jsx - Modern Static Version with Details
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, FaStethoscope, FaAmbulance, FaMicroscope, 
  FaLaptopMedical, FaHeartbeat, FaChevronRight, 
  FaCheckCircle, FaClock, FaUserMd, FaHospitalUser,
  FaArrowRight, FaBookOpen, FaShieldAlt, FaAward,
  FaHandHoldingHeart, FaStar, FaQuoteLeft, FaImage as FaImageIcon,
  FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaSpinner, FaShareAlt, FaPrint
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSharing, setIsSharing] = useState(false);

  // Complete services data with detailed information
  const servicesData = [
    {
      id: 1,
      name: "Refractive Surgery",
      icon: <FaEye />,
      shortDescription: "Advanced laser vision correction procedures for freedom from glasses.",
      detailedDescription: "Refractive surgery is a modern vision correction procedure designed to reduce or eliminate dependence on glasses and contact lenses. Using advanced laser technology, it corrects common vision problems such as myopia (nearsightedness), hyperopia (farsightedness), and astigmatism.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop",
      features: [
        "Bladeless LASIK technology",
        "Customized vision correction",
        "Quick recovery time",
        "High success rate"
      ],
      treatment: [
        "Comprehensive pre-surgery evaluation",
        "Advanced laser procedure",
        "Post-operative care and follow-up",
        "Lifelong vision maintenance"
      ],
      whyChoose: [
        "World-class technology",
        "Experienced surgeons",
        "Personalized treatment plans",
        "Affordable packages"
      ],
      faqs: [
        { q: "Is LASIK painful?", a: "No, LASIK is virtually painless with numbing drops used during the procedure." },
        { q: "How long is recovery?", a: "Most patients see clearly within 24-48 hours." }
      ]
    },
    {
      id: 2,
      name: "Cornea",
      icon: <FaEye />,
      shortDescription: "Specialized treatment for corneal disorders and diseases.",
      detailedDescription: "The cornea is the transparent front part of the eye that covers the iris, pupil, and anterior chamber. Our cornea specialists provide comprehensive care for various corneal conditions using advanced diagnostic and treatment techniques.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop",
      features: [
        "Advanced corneal imaging",
        "Keratoconus management",
        "Corneal transplantation",
        "Cross-linking therapy"
      ],
      treatment: [
        "Comprehensive corneal evaluation",
        "Personalized treatment planning",
        "Advanced surgical procedures",
        "Long-term follow-up care"
      ],
      whyChoose: [
        "Specialized corneal expertise",
        "Advanced diagnostic equipment",
        "Proven treatment outcomes",
        "Patient-centered approach"
      ],
      faqs: [
        { q: "What is keratoconus?", a: "Keratoconus is a progressive thinning of the cornea that causes vision distortion." }
      ]
    },
    {
      id: 3,
      name: "Cataract",
      icon: <FaEye />,
      shortDescription: "Painless cataract removal with premium lens implants for clear vision.",
      detailedDescription: "A cataract is the clouding of the eye's natural lens, which affects vision. Our advanced cataract surgery uses phacoemulsification technique with premium intraocular lens implants for the best possible visual outcomes.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
      features: [
        "Micro-incision surgery",
        "Premium lens options",
        "Quick recovery",
        "Excellent visual outcomes"
      ],
      treatment: [
        "Comprehensive eye examination",
        "Advanced surgical planning",
        "Painless cataract removal",
        "Post-operative care"
      ],
      whyChoose: [
        "Leading cataract surgeons",
        "Advanced technology",
        "Premium lens implants",
        "Affordable packages"
      ],
      faqs: [
        { q: "Is cataract surgery safe?", a: "Yes, cataract surgery is one of the safest and most successful procedures." }
      ]
    },
    {
      id: 4,
      name: "Vitreous, Retina, & Uvea",
      icon: <FaMicroscope />,
      shortDescription: "Advanced retinal and vitreous treatments for complex eye conditions.",
      detailedDescription: "Our vitreo-retinal department is equipped with advanced diagnostic and treatment technology for managing complex retinal and vitreous disorders, including diabetic retinopathy, retinal detachment, and uveitis.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
      features: [
        "High-resolution retinal imaging",
        "Laser photocoagulation",
        "Vitrectomy surgery",
        "Anti-VEGF injections"
      ],
      treatment: [
        "Comprehensive retinal evaluation",
        "Advanced diagnostic testing",
        "Personalized treatment plans",
        "Ongoing monitoring"
      ],
      whyChoose: [
        "Expert retinal specialists",
        "Advanced technology",
        "Proven treatment outcomes",
        "Comprehensive care"
      ],
      faqs: [
        { q: "What is diabetic retinopathy?", a: "It's a diabetes complication that affects the eyes, caused by damage to the blood vessels of the retina." }
      ]
    },
    {
      id: 5,
      name: "ROP Screening",
      icon: <FaEye />,
      shortDescription: "Specialized screening for retinopathy of prematurity in infants.",
      detailedDescription: "Retinopathy of Prematurity (ROP) screening is essential for premature infants to detect abnormal blood vessel growth in the retina. Early detection and treatment can prevent vision loss and blindness.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
      features: [
        "Specialized pediatric screening",
        "Advanced imaging technology",
        "Early intervention",
        "Prevention of vision loss"
      ],
      treatment: [
        "Comprehensive screening examination",
        "Laser therapy if needed",
        "Regular follow-up care",
        "Multidisciplinary approach"
      ],
      whyChoose: [
        "Expert pediatric specialists",
        "Advanced screening technology",
        "Timely intervention",
        "Compassionate care"
      ],
      faqs: [
        { q: "When is ROP screening done?", a: "Screening is typically done for premature infants born before 30 weeks." }
      ]
    },
    {
      id: 6,
      name: "Glaucoma",
      icon: <FaEye />,
      shortDescription: "Early detection and comprehensive management of glaucoma.",
      detailedDescription: "Glaucoma is a group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye. Our glaucoma specialists provide early detection, medical management, and advanced treatment options.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop",
      features: [
        "Early detection screening",
        "Advanced diagnostic technology",
        "Medical management",
        "Laser and surgical options"
      ],
      treatment: [
        "Comprehensive glaucoma evaluation",
        "Medical therapy management",
        "Laser treatment options",
        "Surgical interventions"
      ],
      whyChoose: [
        "Glaucoma specialists",
        "Advanced diagnostic tools",
        "Personalized treatment",
        "Long-term monitoring"
      ],
      faqs: [
        { q: "Can glaucoma be cured?", a: "Glaucoma can be managed but not cured. Early treatment can prevent vision loss." }
      ]
    }
  ];

  useEffect(() => {
    const serviceName = location.state?.selectedService;
    if (serviceName) {
      const service = servicesData.find(s => s.name === serviceName);
      if (service) setSelectedService(service);
    } else if (servicesData.length > 0) {
      setSelectedService(servicesData[0]);
    }
  }, [location.state]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedService?.name,
          text: selectedService?.shortDescription,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTabContent = () => {
    if (!selectedService) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content-modern">
            <div className="overview-image">
              <img src={selectedService.image} alt={selectedService.name} />
            </div>
            <h3>About {selectedService.name}</h3>
            <p>{selectedService.detailedDescription}</p>
            <div className="features-grid">
              {selectedService.features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <FaCheckCircle />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'treatment':
        return (
          <div className="treatment-content-modern">
            <h3>Treatment Process</h3>
            <div className="treatment-steps">
              {selectedService.treatment.map((step, idx) => (
                <div key={idx} className="treatment-step">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-content">
                    <h4>{step}</h4>
                    <p>Detailed information about this step in the treatment process.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'whyus':
        return (
          <div className="whyus-content-modern">
            <h3>Why Choose Us</h3>
            <div className="whyus-grid">
              {selectedService.whyChoose.map((item, idx) => (
                <div key={idx} className="whyus-card">
                  <div className="whyus-icon">
                    {idx === 0 && <FaShieldAlt />}
                    {idx === 1 && <FaAward />}
                    {idx === 2 && <FaHandHoldingHeart />}
                    {idx === 3 && <FaStar />}
                  </div>
                  <h4>{item}</h4>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'faqs':
        return (
          <div className="faqs-content-modern">
            <h3>Frequently Asked Questions</h3>
            {selectedService.faqs.map((faq, idx) => (
              <div key={idx} className="faq-item-modern">
                <div className="faq-question">
                  <FaQuoteLeft />
                  <h4>{faq.q}</h4>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="services-page-modern">
      {/* Hero Section */}
      <section className="services-hero-premium">
        <div className="hero-bg-animation"></div>
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content-wrapper"
          >
            <div className="hero-badge-premium">
              <span className="badge-icon">⚕️</span>
              <span>World-Class Eye Care</span>
            </div>
            <h1 className="hero-title-premium">
              Comprehensive <span className="gradient-text">Eye Care</span> Services
            </h1>
            <p className="hero-description-premium">
              Advanced technology meets compassionate care. We offer a complete range of 
              specialized eye care services tailored to your unique needs.
            </p>
            <div className="hero-stats-premium">
              <div className="stat-item-premium">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Patients</span>
              </div>
              <div className="stat-item-premium">
                <span className="stat-number">15+</span>
                <span className="stat-label">Expert Doctors</span>
              </div>
              <div className="stat-item-premium">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Emergency Care</span>
              </div>
              <div className="stat-item-premium">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="hero-wave-premium">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="services-container-modern">
        <div className="container-premium">
          <div className="services-layout-modern">
            {/* Sidebar */}
            <div className="services-sidebar-modern">
              <div className="sidebar-header-premium">
                <h3>Our Services</h3>
                <p>{servicesData.length} specialized treatments</p>
              </div>
              <div className="services-list-modern">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className={`service-list-item ${selectedService?.id === service.id ? 'active' : ''}`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="service-list-icon">{service.icon}</div>
                    <div className="service-list-info">
                      <h4>{service.name}</h4>
                      <p>{service.shortDescription.substring(0, 55)}...</p>
                    </div>
                    <FaChevronRight className="list-arrow" />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="services-main-content-modern">
              <AnimatePresence mode="wait">
                {selectedService ? (
                  <motion.div
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="service-detail-modern"
                  >
                    <div className="service-detail-header">
                      <div className="service-icon-large">
                        {selectedService.icon}
                      </div>
                      <div className="service-title-section">
                        <h2>{selectedService.name}</h2>
                        <p>{selectedService.shortDescription}</p>
                      </div>
                      <div className="service-actions">
                        <button className="action-btn-premium" onClick={handlePrint}>
                          <FaPrint /> Print
                        </button>
                        <button className="action-btn-premium" onClick={handleShare} disabled={isSharing}>
                          <FaShareAlt /> {isSharing ? 'Sharing...' : 'Share'}
                        </button>
                      </div>
                    </div>

                    <div className="service-tabs">
                      <button 
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('overview')}
                      >
                        <FaBookOpen /> Overview
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'treatment' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('treatment')}
                      >
                        <FaHospitalUser /> Treatment
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'whyus' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('whyus')}
                      >
                        <FaStar /> Why Choose Us
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('faqs')}
                      >
                        <FaQuoteLeft /> FAQs
                      </button>
                    </div>

                    <div className="service-tab-content">
                      {renderTabContent()}
                    </div>

                    <div className="service-cta">
                      <button className="cta-button" onClick={() => navigate('/appointment')}>
                        Book Appointment Now <FaArrowRight />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="no-service-selected"
                  >
                    <div className="placeholder-content">
                      <FaEye className="placeholder-icon" />
                      <h3>Select a Service</h3>
                      <p>Choose a service from the sidebar to view detailed information.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;