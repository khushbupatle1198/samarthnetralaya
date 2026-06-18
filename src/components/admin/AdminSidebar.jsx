// components/admin/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaUserMd, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaImage,
  FaBuilding,
  FaHeartbeat,
  FaStethoscope,
  FaClipboardList,
  FaChartPie,
  FaBell,
  FaEnvelope
} from 'react-icons/fa';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin User');
  const [adminRole, setAdminRole] = useState('Administrator');

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setAdminName(parsedAdmin.fullName || parsedAdmin.username || 'Admin User');
    }
  }, []);

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />,
      exact: true,
      description: 'Overview & Statistics'
    },
    { 
      path: '/admin/hero', 
      name: 'Hero Section', 
      icon: <FaImage />,
      description: 'Manage hero banner'
    },
    { 
      path: '/admin/facilities', 
      name: 'Facilities', 
      icon: <FaBuilding />,
      description: 'Manage facilities'
    },
    { 
      path: '/admin/appointments', 
      name: 'Appointments', 
      icon: <FaCalendarAlt />,
      badge: '',
      description: 'Manage appointments'
    },
    { 
      path: '/admin/patients', 
      name: 'Patients', 
      icon: <FaUsers />,
      badge: '',
      description: 'Patient records'
    },
    { 
      path: '/admin/doctors', 
      name: 'Doctors', 
      icon: <FaUserMd />,
      badge: '',
      description: 'Doctor profiles'
    },
    { path: '/admin/services', 
        name: 'Services', 
        icon: <FaStethoscope />, 
        badge: '' 
    },

    { 
      path: '/admin/blogs', 
      name: 'Blogs', 
      icon: <FaClipboardList />,
      badge: '',
      description: 'Manage blog posts'
    },
    { 
      path: '/admin/profile', 
      name: 'Profile', 
      icon: <FaUserCircle />,
      description: 'Account settings'
    },
    { 
      path: '/admin/settings', 
      name: 'Settings', 
      icon: <FaCog />,
      description: 'System settings'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      navigate('/admin/login');
    }
  };

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className={styles.mobileMenuToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.sidebarOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoIcon}>
              <FaEye />
              <div className={styles.logoPulse}></div>
            </div>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div 
                  className={styles.logoText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.logoMain}>Samarth</span>
                  <span className={styles.logoSub}>Netralaya</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Info Section */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              className={styles.userSection}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <FaUserCircle />
                  <span className={styles.userStatus}></span>
                </div>
                <div className={styles.userDetails}>
                  <div className={styles.userName}>{adminName}</div>
                  <div className={styles.userRole}>{adminRole}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu */}
        <nav className={styles.navMenu}>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                to={item.path}
                className={`${styles.navItem} ${isActive(item.path) ? styles.navItemActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.span 
                      className={styles.navText}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && isOpen && (
                  <span className={styles.navBadge}>
                    {item.badge}
                  </span>
                )}
                {!isOpen && (
                  <span className={styles.navTooltip}>{item.description}</span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer Section with Logout Button */}
        <div className={styles.footerSection}>
          <motion.button 
            className={styles.logoutButton}
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.navIcon}><FaSignOutAlt /></span>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span 
                  className={styles.navText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Version Info */}
          {isOpen && (
            <motion.div 
              className={styles.versionInfo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>Version 1.0.0</p>
              <p>© 2025 Samarth Netralaya</p>
            </motion.div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;