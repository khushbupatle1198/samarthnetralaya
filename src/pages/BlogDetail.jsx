// pages/BlogDetail.jsx - Updated to use slug
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaUser, FaClock, FaEye, FaTag, 
  FaShare, FaPrint, FaArrowLeft, FaQuoteLeft, FaCheckCircle,
  FaArrowRight, FaNewspaper
} from 'react-icons/fa';
import { blogPosts, getRelatedBlogs } from '../data/blogData';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams(); // ✅ Changed from id to slug
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Find blog by slug
    const foundBlog = blogPosts.find(b => b.slug === slug);
    if (foundBlog) {
      setBlog(foundBlog);
      const related = getRelatedBlogs(foundBlog.id, foundBlog.category);
      setRelatedBlogs(related);
    } else {
      navigate('/blogs');
    }
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case 'heading':
        return <h2 key={index} className="blog-heading">{contentItem.text}</h2>;
      case 'paragraph':
        return <p key={index} className="blog-paragraph">{contentItem.text}</p>;
      case 'quote':
        return (
          <div key={index} className="blog-quote">
            <FaQuoteLeft />
            <p>{contentItem.text}</p>
          </div>
        );
      case 'list':
        return (
          <ul key={index} className="blog-list">
            {contentItem.items.map((item, idx) => (
              <li key={idx}><FaCheckCircle /> {item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  if (!blog) {
    return (
      <div className="blog-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/blogs')}>
          <FaArrowLeft /> Back to Blogs
        </button>

        {/* Header */}
        <div className="blog-header">
          <div className="blog-category-tag">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="blog-meta-bar">
            <span><FaCalendarAlt /> {formatDate(blog.date)}</span>
            <span><FaUser /> {blog.author}</span>
            <span><FaClock /> {blog.readTime}</span>
            <span><FaEye /> {blog.viewCount} views</span>
          </div>
          <div className="blog-share">
            <button onClick={handleShare}><FaShare /> Share</button>
            <button onClick={() => window.print()}><FaPrint /> Print</button>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="blog-featured-image">
            <img src={blog.featuredImage} alt={blog.title} />
          </div>
        )}

        {/* Content */}
        <div className="blog-content-wrapper">
          <div className="blog-main-content">
            {blog.content.map((item, index) => renderContent(item, index))}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            <FaTag />
            {blog.tags.map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="related-posts">
            <h3>Related Articles</h3>
            <div className="related-grid">
              {relatedBlogs.map(related => (
                <div 
                  key={related.id} 
                  className="related-card" 
                  onClick={() => navigate(`/blog/${related.slug}`)}
                >
                  <div className="related-image">
                    <img src={related.featuredImage} alt={related.title} />
                  </div>
                  <h4>{related.title}</h4>
                  <div className="related-meta">
                    <span><FaCalendarAlt /> {formatDate(related.date)}</span>
                    <FaArrowRight />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;