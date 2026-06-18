import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API_CONFIG from "../config/apiConfig";
import "./HeroSection.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920";

function HeroSection() {
  const navigate = useNavigate();
  const BASE_URL = API_CONFIG.BASE_URL;

  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/hero/active`);
      const data = await res.json();

      setHeroData(data);
    } catch (err) {
      console.error(err);

      setHeroData({
        title: "Welcome to Samarth Netralaya",
        subtitle: "Best Care for Your Good Eye Health",
        description:
          "Compassionate eye care with advanced technology and experienced specialists.",
        btnText: "Book Appointment",
        btnLink: "/appointment",
        secondaryBtnText: "Learn More",
        secondaryBtnLink: "/about",
      });
    } finally {
      setLoading(false);
    }
  };

  const videoUrl =
    heroData?.videoUrl &&
    heroData.videoUrl.startsWith("http")
      ? heroData.videoUrl
      : heroData?.videoUrl
      ? `${BASE_URL}${heroData.videoUrl}`
      : null;

  if (loading) {
    return (
      <div className="hero-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="hero-section">
      {/* Background */}

      <div className="hero-bg">
        {!videoError && videoUrl ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => {
              console.log("Video failed");
              setVideoError(true);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="hero-image"
            style={{
              backgroundImage: `url(${FALLBACK_IMAGE})`,
            }}
          />
        )}

        <div className="hero-overlay"></div>
      </div>

      {/* Content */}

      <div className="hero-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              Samarth Netralaya
            </div>

            <h1 className="hero-title">
              {heroData?.title}
            </h1>

            <h2 className="hero-subtitle">
              {heroData?.subtitle}
            </h2>

            <p className="hero-description">
              {heroData?.description}
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  navigate(heroData?.btnLink || "/appointment")
                }
              >
                {heroData?.btnText || "Book Appointment"}
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  navigate(heroData?.secondaryBtnLink || "/about")
                }
              >
                {heroData?.secondaryBtnText || "Learn More"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;