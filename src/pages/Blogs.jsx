// pages/Blogs.jsx - Complete Static Version
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaCalendarAlt, FaUser, FaClock, FaEye, 
  FaArrowRight, FaNewspaper, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { 
  blogPosts, 
  getFeaturedBlogs, 
  getAllCategories,
  searchBlogs 
} from '../data/blogData';
import './Blogs.css';

const Blogs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredBlogs, setFilteredBlogs] = useState(blogPosts);
  const itemsPerPage = 6;

  const categories = getAllCategories();
  const featuredBlogs = getFeaturedBlogs();

  useEffect(() => {
    let results = blogPosts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(blog => blog.category === selectedCategory);
    }
    
    // Filter by search
    if (searchTerm.trim()) {
      results = searchBlogs(searchTerm);
    }
    
    setFilteredBlogs(results);
    setCurrentPage(0);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">Our Blog</div>
            <h1>Insights & Updates</h1>
            <p>Stay informed with the latest eye care tips, treatments, and news from Samarth Netralaya</p>
          </motion.div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="blogs-search-section">
        <div className="container">
          <div className="search-filter-bar">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && selectedCategory === 'all' && !searchTerm && (
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="featured-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleBlogClick(blog.slug)}
                >
                  <div className="featured-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                    <span className="featured-badge">Featured</span>
                  </div>
                  <div className="featured-content">
                    <div className="blog-meta">
                      <span><FaCalendarAlt /> {formatDate(blog.date)}</span>
                      <span><FaUser /> {blog.author}</span>
                      <span><FaClock /> {blog.readTime}</span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.shortDescription}</p>
                    <div className="read-more">
                      Read More <FaArrowRight />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs Grid */}
      <section className="blogs-grid-section">
        <div className="container">
          <h2 className="section-title">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Articles'}
          </h2>
          
          {filteredBlogs.length === 0 ? (
            <div className="no-blogs">
              <FaNewspaper />
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <>
              <div className="blogs-grid">
                {paginatedBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleBlogClick(blog.slug)}
                  >
                    <div className="blog-image">
                      <img src={blog.featuredImage} alt={blog.title} />
                      <span className="blog-category">{blog.category}</span>
                    </div>
                    <div className="blog-content">
                      <h3>{blog.title}</h3>
                      <p>{blog.shortDescription}</p>
                      <div className="blog-footer">
                        <div className="blog-meta-sm">
                          <span><FaCalendarAlt /> {formatDate(blog.date)}</span>
                          <span><FaClock /> {blog.readTime}</span>
                          <span><FaEye /> {blog.viewCount}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    disabled={currentPage === 0} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <FaChevronLeft /> Previous
                  </button>
                  <span>Page {currentPage + 1} of {totalPages}</span>
                  <button 
                    disabled={currentPage === totalPages - 1} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;