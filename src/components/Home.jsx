import React, { useState, useEffect } from 'react';
import '../assets/style/Home.css';

// Import generated images
import heroBanner1 from '../assets/images/hero_banner1.jpg';
import heroBanner2 from '../assets/images/hero_banner2.jpg';
import heroBanner3 from '../assets/images/hero_banner3.jpg';
import catElectronics from '../assets/images/cat_electronics.jpg';
import catFashion from '../assets/images/cat_fashion.jpg';
import catAppliances from '../assets/images/cat_appliances.jpg';
import catBeauty from '../assets/images/cat_beauty.jpg';
import prodPhone from '../assets/images/product_phone.jpg';
import prodLaptop from '../assets/images/product_laptop.jpg';
import prodHeadphones from '../assets/images/product_headphones.jpg';
import prodSmartwatch from '../assets/images/product_smartwatch.jpg';
import prodShoes from '../assets/images/product_shoes.jpg';
import gallery1 from '../assets/images/gallery1.jpg';

const Home = () => {
  // State management
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistItems, setWishlistItems] = useState([1, 4]);
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);


  const heroBanners = [
    { id: 1, img: heroBanner1, title: 'Big Festive Zoro Days', sub: 'Up to 80% OFF on Top Tech & Accessories' },
    { id: 2, img: heroBanner2, title: 'Future Tech Electronics', sub: 'Next-Gen Smartphones & Smartwatches' },
    { id: 3, img: heroBanner3, title: 'Urban Wave Fashion Fest', sub: 'Min. 60% OFF on Trendy Streetwear' }
  ];

  const products = [
    {
      id: 1,
      name: 'Zoro Flagship Phone 15 Pro (12GB RAM, 256GB Titanium)',
      category: 'tech',
      price: 69999,
      originalPrice: 89999,
      discount: '22% OFF',
      rating: 4.8,
      reviews: 1420,
      img: prodPhone,
      isAssured: true,
      stock: 4
    },
    {
      id: 2,
      name: 'Zoro UltraBook M3 Gaming Laptop (16" OLED, RTX 4070)',
      category: 'tech',
      price: 114999,
      originalPrice: 139999,
      discount: '17% OFF',
      rating: 4.9,
      reviews: 890,
      img: prodLaptop,
      isAssured: true,
      stock: 7
    },
    {
      id: 3,
      name: 'Zoro ANC Noise Canceling Wireless Over-Ear Headphones',
      category: 'audio',
      price: 8999,
      originalPrice: 14999,
      discount: '40% OFF',
      rating: 4.7,
      reviews: 2310,
      img: prodHeadphones,
      isAssured: true,
      stock: 12
    },
    {
      id: 4,
      name: 'Zoro SmartWatch Ultra (AMOLED Display, Fitness Tracker)',
      category: 'audio',
      price: 4499,
      originalPrice: 9999,
      discount: '55% OFF',
      rating: 4.6,
      reviews: 3100,
      img: prodSmartwatch,
      isAssured: true,
      stock: 5
    },
    {
      id: 5,
      name: 'Zoro Pulse Air Running Sneakers (Neon Blue & Yellow)',
      category: 'fashion',
      price: 2999,
      originalPrice: 5999,
      discount: '50% OFF',
      rating: 4.5,
      reviews: 940,
      img: prodShoes,
      isAssured: true,
      stock: 9
    }
  ];

  // Auto carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);


  // Glassmorphic scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast trigger helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle wishlist item
  const toggleWishlist = (id) => {
    if (wishlistItems.includes(id)) {
      setWishlistItems(wishlistItems.filter((item) => item !== id));
      triggerToast('Removed from your Wishlist');
    } else {
      setWishlistItems([...wishlistItems, id]);
      triggerToast('Added to your Wishlist ❤️');
    }
  };

  // Add item to cart
  const addToCart = (product) => {
    setCartCount((prev) => prev + 1);
    triggerToast(`Added "${product.name.slice(0, 20)}..." to Cart 🛒`);
  };

  // Filter products by tab
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  // Search results
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="zoro-app-wrapper">
      {/* 2. NAV SECTION */}
      <header className={`zoro-navbar-header ${isScrolled ? 'glassmorphic' : ''}`}>
        <div className="zoro-nav-container">
          {/* Logo & Plus Badge */}
          <div 
            className="zoro-brand-wrapper" 
            onClick={() => {
              if (window.__lenis) {
                window.__lenis.scrollTo(0, { duration: 1.2 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="zoro-brand-name">Zoro</span>
            
          </div>

          {/* Interactive Search Bar */}
          <div className="zoro-search-box">
            <div className="zoro-search-input-group">
              <input
                type="text"
                className="zoro-search-input"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
              />
              <button className="zoro-search-btn">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Live Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="zoro-search-dropdown">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="zoro-search-item"
                    onClick={() => {
                      setQuickViewProduct(item);
                      setShowSearchDropdown(false);
                    }}
                  >
                    <img src={item.img} alt={item.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#388e3c' }}>₹{item.price.toLocaleString()} ({item.discount})</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav Actions */}
          <div className="zoro-nav-actions">
            <button className="zoro-login-btn" onClick={() => setShowLoginModal(true)}>
              Login
            </button>

            <span className="zoro-nav-link zoro-seller-link">
              Become a Seller
            </span>

            <span className="zoro-nav-link" onClick={() => triggerToast(`Wishlist contains ${wishlistItems.length} items ❤️`)}>
              <i className="bi bi-heart"></i>
              <span className="zoro-nav-label">Wishlist</span>
              {wishlistItems.length > 0 && <span className="zoro-badge-count">{wishlistItems.length}</span>}
            </span>

            <span className="zoro-nav-link" onClick={() => triggerToast(`Cart has ${cartCount} items 🛒`)}>
              <i className="bi bi-cart3"></i>
              <span className="zoro-nav-label">Cart</span>
              <span className="zoro-badge-count">{cartCount}</span>
            </span>
          </div>
        </div>

        {/* Category Strip */}
        <div className="zoro-cat-strip">
          <div className="zoro-cat-container">
            <div className="zoro-cat-item" onClick={() => setActiveTab('tech')}>
              <i className="bi bi-laptop zoro-cat-icon"></i>
              <span>Electronics</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('tech')}>
              <i className="bi bi-phone zoro-cat-icon"></i>
              <span>Mobiles</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('fashion')}>
              <i className="bi bi-bag-heart zoro-cat-icon"></i>
              <span>Fashion</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('all')}>
              <i className="bi bi-tv zoro-cat-icon"></i>
              <span>Appliances</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('audio')}>
              <i className="bi bi-headphones zoro-cat-icon"></i>
              <span>Audio</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('fashion')}>
              <i className="bi bi-watch zoro-cat-icon"></i>
              <span>Beauty</span>
            </div>
            <div className="zoro-cat-item" onClick={() => setActiveTab('all')}>
              <i className="bi bi-lightning-charge zoro-cat-icon" style={{ color: '#fb641b' }}></i>
              <span style={{ color: '#fb641b', fontWeight: 800 }}>Top Offers</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="zoro-hero-section" data-aos="fade-up">
        {/* Main Auto Carousel */}
        <div className="zoro-carousel-card">
          <img
            src={heroBanners[currentBanner].img}
            alt={heroBanners[currentBanner].title}
            className="zoro-carousel-slide"
          />
          <button
            className="zoro-carousel-nav-btn prev"
            onClick={() => setCurrentBanner((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="zoro-carousel-nav-btn next"
            onClick={() => setCurrentBanner((prev) => (prev + 1) % heroBanners.length)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <div className="zoro-carousel-indicators">
            {heroBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`zoro-indicator-dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              ></div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. OFFER SECTION */}
      <section className="zoro-offer-section" data-aos="fade-up">
        <div className="zoro-offer-card-wrapper">
          <div className="zoro-section-header">
            <div className="zoro-section-title">
              <i className="bi bi-fire"></i> Flash Deals & Mega Discounts
            </div>
            <button className="zoro-view-all-btn" onClick={() => triggerToast('Loading all flash offers...')}>
              VIEW ALL
            </button>
          </div>

          <div className="zoro-offer-grid">
            <div className="zoro-offer-item" data-aos="fade-up" data-aos-delay="100" onClick={() => setQuickViewProduct(products[0])}>
              <span className="zoro-offer-badge">MIN 50% OFF</span>
              <img src={prodPhone} alt="Smartphones" className="zoro-offer-img" />
              <div className="zoro-offer-name">Flagship Smartphones</div>
              <div className="zoro-offer-discount">From ₹69,999</div>
              <div className="zoro-offer-sub">Apple, Samsung, Zoro</div>
              <div className="zoro-stock-bar-bg">
                <div className="zoro-stock-bar-fill" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="zoro-offer-item" data-aos="fade-up" data-aos-delay="200" onClick={() => setQuickViewProduct(products[1])}>
              <span className="zoro-offer-badge">UP TO 40% OFF</span>
              <img src={prodLaptop} alt="Gaming Laptops" className="zoro-offer-img" />
              <div className="zoro-offer-name">Gaming Laptops</div>
              <div className="zoro-offer-discount">From ₹1,14,999</div>
              <div className="zoro-offer-sub">Intel i9, RTX 4070</div>
              <div className="zoro-stock-bar-bg">
                <div className="zoro-stock-bar-fill" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="zoro-offer-item" data-aos="fade-up" data-aos-delay="300" onClick={() => setQuickViewProduct(products[2])}>
              <span className="zoro-offer-badge">EXTRA ₹2,000 OFF</span>
              <img src={prodHeadphones} alt="Audio Gear" className="zoro-offer-img" />
              <div className="zoro-offer-name">ANC Audio Gear</div>
              <div className="zoro-offer-discount">Under ₹8,999</div>
              <div className="zoro-offer-sub">Sony, Bose, Zoro Sound</div>
              <div className="zoro-stock-bar-bg">
                <div className="zoro-stock-bar-fill" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="zoro-offer-item" data-aos="fade-up" data-aos-delay="400" onClick={() => setQuickViewProduct(products[3])}>
              <span className="zoro-offer-badge">FLAT 55% OFF</span>
              <img src={prodSmartwatch} alt="Smartwatches" className="zoro-offer-img" />
              <div className="zoro-offer-name">Fitness Smartwatches</div>
              <div className="zoro-offer-discount">From ₹4,499</div>
              <div className="zoro-offer-sub">AMOLED, GPS, SpO2</div>
              <div className="zoro-stock-bar-bg">
                <div className="zoro-stock-bar-fill" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SECTION (BENTO GRID WITH 3D PERSPECTIVE) */}
      <section className="zoro-bento-section" data-aos="fade-up">
        <div className="zoro-section-header" style={{ marginBottom: 20 }}>
          <div className="zoro-section-title">
            <i className="bi bi-grid-3x3-gap-fill" style={{ color: '#2874f0' }}></i> Featured Categories
          </div>
        </div>

        <div className="zoro-bento-grid">
          {/* Bento Item 1 - Large Feature */}
          <div className="zoro-bento-item zoro-bento-1" data-aos="zoom-in" data-aos-delay="100" onClick={() => setActiveTab('tech')}>
            <img src={catElectronics} alt="Electronics Hub" className="zoro-bento-img" />
            <div className="zoro-bento-glass-overlay">
              <span className="zoro-bento-tag">FLAGSHIP TECH HUB</span>
              <div className="zoro-bento-title">Next-Gen Laptops & Workspace Gear</div>
              <div className="zoro-bento-desc">Upgrade your daily workflow with high performance processors & OLED displays.</div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="zoro-bento-item zoro-bento-2" data-aos="zoom-in" data-aos-delay="200" onClick={() => setActiveTab('fashion')}>
            <img src={catFashion} alt="Fashion Collection" className="zoro-bento-img" />
            <div className="zoro-bento-glass-overlay">
              <span className="zoro-bento-tag">STYLE FEST</span>
              <div className="zoro-bento-title" style={{ fontSize: 18 }}>Urban Streetwear</div>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="zoro-bento-item zoro-bento-3" data-aos="zoom-in" data-aos-delay="300" onClick={() => setActiveTab('all')}>
            <img src={catAppliances} alt="Smart Home" className="zoro-bento-img" />
            <div className="zoro-bento-glass-overlay">
              <span className="zoro-bento-tag">SMART LIVING</span>
              <div className="zoro-bento-title" style={{ fontSize: 18 }}>OLED TVs & Appliances</div>
            </div>
          </div>

          {/* Bento Item 4 */}
          <div className="zoro-bento-item zoro-bento-4" data-aos="zoom-in" data-aos-delay="400" onClick={() => setActiveTab('all')}>
            <img src={catBeauty} alt="Beauty Skincare" className="zoro-bento-img" />
            <div className="zoro-bento-glass-overlay">
              <span className="zoro-bento-tag">LUXURY BEAUTY</span>
              <div className="zoro-bento-title" style={{ fontSize: 18 }}>Organic Serums & Skincare</div>
            </div>
          </div>

          {/* Bento Item 5 */}
          <div className="zoro-bento-item zoro-bento-5" data-aos="zoom-in" data-aos-delay="500" onClick={() => setActiveTab('audio')}>
            <img src={gallery1} alt="Mobile Workspace" className="zoro-bento-img" />
            <div className="zoro-bento-glass-overlay">
              <span className="zoro-bento-tag">WORK & PLAY</span>
              <div className="zoro-bento-title" style={{ fontSize: 18 }}>Mobile Tech & Audio</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SECTION */}
      <section className="zoro-product-section" data-aos="fade-up">
        <div className="zoro-product-card-wrapper">
          <div className="zoro-section-header">
            <div className="zoro-section-title">
              <i className="bi bi-bag-check-fill"></i> Best Sellers & Recommended Products
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="zoro-product-tabs">
            <button className={`zoro-tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              🔥 All Trending
            </button>
            <button className={`zoro-tab-btn ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>
              💻 Mobiles & Laptops
            </button>
            <button className={`zoro-tab-btn ${activeTab === 'audio' ? 'active' : ''}`} onClick={() => setActiveTab('audio')}>
              🎧 Wearables & Sound
            </button>
            <button className={`zoro-tab-btn ${activeTab === 'fashion' ? 'active' : ''}`} onClick={() => setActiveTab('fashion')}>
              👟 Fashion & Footwear
            </button>
          </div>

          {/* Product Grid */}
          <div className="zoro-product-grid">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="zoro-product-card" data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                {/* Wishlist Toggle Button */}
                <button
                  className={`zoro-wishlist-toggle ${wishlistItems.includes(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <i className={`bi ${wishlistItems.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>

                {/* Product Image */}
                <div className="zoro-prod-img-container" onClick={() => setQuickViewProduct(product)}>
                  <img src={product.img} alt={product.name} className="zoro-prod-img" />
                </div>

                {/* Assured Badge */}
                {product.isAssured && (
                  <div className="zoro-assured-badge">
                    <i className="bi bi-patch-check-fill"></i> Zoro Assured
                  </div>
                )}

                {/* Product Title */}
                <div className="zoro-prod-title" onClick={() => setQuickViewProduct(product)} style={{ cursor: 'pointer' }}>
                  {product.name}
                </div>

                {/* Rating Row */}
                <div className="zoro-rating-row">
                  <div className="zoro-rating-pill">
                    {product.rating} <i className="bi bi-star-fill" style={{ fontSize: 10 }}></i>
                  </div>
                  <div className="zoro-rating-count">({product.reviews.toLocaleString()})</div>
                </div>

                {/* Price Row */}
                <div className="zoro-price-row">
                  <span className="zoro-current-price">₹{product.price.toLocaleString()}</span>
                  <span className="zoro-original-price">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="zoro-discount-tag">{product.discount}</span>
                </div>

                {/* Add to Cart Button */}
                <button className="zoro-add-cart-btn" onClick={() => addToCart(product)}>
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION (3D PERSPECTIVE LIGHTBOX SHOWCASE) */}
      <section className="zoro-gallery-section" data-aos="fade-up">
        <div className="zoro-gallery-card-wrapper">
          <div className="zoro-section-header">
            <div className="zoro-section-title">
              <i className="bi bi-camera-fill" style={{ color: '#2874f0' }}></i> Gallery
            </div>
            <span style={{ fontSize: 13, color: '#878787' }}>Click image to inspect high-res detail</span>
          </div>

          <div className="zoro-gallery-grid">
            <div className="zoro-gallery-item" data-aos="flip-up" data-aos-delay="100" onClick={() => setLightboxImg(catElectronics)}>
              <img src={catElectronics} alt="Tech Setup" className="zoro-gallery-img" />
              <div className="zoro-gallery-caption">
                <h4>Smart Tech Workstation</h4>
                <p style={{ fontSize: 12 }}>Ultra-thin aluminum laptop with high resolution OLED monitor.</p>
              </div>
            </div>

            <div className="zoro-gallery-item" data-aos="flip-up" data-aos-delay="200" onClick={() => setLightboxImg(catFashion)}>
              <img src={catFashion} alt="Fashion Setup" className="zoro-gallery-img" />
              <div className="zoro-gallery-caption">
                <h4>Urban Denim & Apparel</h4>
                <p style={{ fontSize: 12 }}>Handcrafted jackets and luxury leather travel backpacks.</p>
              </div>
            </div>

            <div className="zoro-gallery-item" data-aos="flip-up" data-aos-delay="300" onClick={() => setLightboxImg(gallery1)}>
              <img src={gallery1} alt="Coffee Tech" className="zoro-gallery-img" />
              <div className="zoro-gallery-caption">
                <h4>Everyday Mobile Work</h4>
                <p style={{ fontSize: 12 }}>Connected accessories for seamless remote productivity.</p>
              </div>
            </div>

            <div className="zoro-gallery-item" data-aos="flip-up" data-aos-delay="400" onClick={() => setLightboxImg(catAppliances)}>
              <img src={catAppliances} alt="Smart Living" className="zoro-gallery-img" />
              <div className="zoro-gallery-caption">
                <h4>Smart Home Theater</h4>
                <p style={{ fontSize: 12 }}>Cinema quality 4K OLED TV with surround sound soundbar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="zoro-testimonial-section" data-aos="zoom-in-up">
        <div className="zoro-testimonial-card-wrapper">
          <div className="zoro-section-header" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <div className="zoro-section-title" style={{ color: '#ffffff' }}>
              <i className="bi bi-chat-quote-fill" style={{ color: '#ffe500' }}></i> Verified Customer Reviews & Experiences
            </div>
          </div>

          <div className="zoro-testimonial-grid">
            <div className="zoro-testimonial-card" data-aos="fade-up" data-aos-delay="100">
              <div>
                <div className="zoro-testi-stars">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <div className="zoro-testi-quote">
                  "Ordered the Zoro Flagship Pro phone during Big Billion Zoro Days. Delivery was incredibly fast — arrived within 18 hours in Mumbai! Build quality is top notch."
                </div>
              </div>
              <div className="zoro-testi-user">
                <div className="zoro-avatar-circle">R</div>
                <div>
                  <div className="zoro-user-name">Rahul Sharma</div>
                  <div className="zoro-user-badge"><i className="bi bi-patch-check-fill"></i> Verified Zoro Buyer</div>
                </div>
              </div>
            </div>

            <div className="zoro-testimonial-card" data-aos="fade-up" data-aos-delay="200">
              <div>
                <div className="zoro-testi-stars">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <div className="zoro-testi-quote">
                  "The Zoro ANC Headphones have incredible sound quality. Active noise cancellation blocks out all ambient background noise while working."
                </div>
              </div>
              <div className="zoro-testi-user">
                <div className="zoro-avatar-circle">P</div>
                <div>
                  <div className="zoro-user-name">Priya Patel</div>
                  <div className="zoro-user-badge"><i className="bi bi-patch-check-fill"></i> Verified Zoro Buyer</div>
                </div>
              </div>
            </div>

            <div className="zoro-testimonial-card" data-aos="fade-up" data-aos-delay="300">
              <div>
                <div className="zoro-testi-stars">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <div className="zoro-testi-quote">
                  "Superb customer support and no hassle returns policy. Zoro has officially become my go-to online shopping platform."
                </div>
              </div>
              <div className="zoro-testi-user">
                <div className="zoro-avatar-circle">A</div>
                <div>
                  <div className="zoro-user-name">Anand Verma</div>
                  <div className="zoro-user-badge"><i className="bi bi-patch-check-fill"></i> Verified Zoro Buyer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section className="zoro-contact-section" data-aos="fade-up">
        <div className="zoro-contact-card-wrapper">
          {/* Newsletter Box */}
          <div className="zoro-newsletter-box" data-aos="fade-right">
            <div className="zoro-section-title" style={{ fontSize: 18 }}>
              <i className="bi bi-envelope-paper-fill" style={{ color: '#2874f0' }}></i> Subscribe to Zoro VIP Offers
            </div>
            <p style={{ fontSize: 13, color: '#666' }}>
              Get instant updates on flash sales, secret discount coupon codes, and upcoming product launches.
            </p>

            {newsletterSuccess ? (
              <div style={{ background: '#e8f5e9', color: '#388e3c', padding: 14, borderRadius: 6, fontWeight: 700 }}>
                <i className="bi bi-check-circle-fill"></i> Thank you! You are now subscribed to Zoro VIP deals.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.includes('@')) {
                    setNewsletterSuccess(true);
                  }
                }}
                className="zoro-form-group"
              >
                <label className="zoro-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="zoro-form-input"
                  placeholder="Enter Your Mail-ID"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="zoro-submit-btn" style={{ marginTop: 8 }}>
                  Subscribe Now <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            )}
          </div>

          {/* Help Desk & FAQ Accordions */}
          <div className="zoro-contact-info" data-aos="fade-left">
            <div className="zoro-section-title" style={{ fontSize: 18 }}>
              <i className="bi bi-headset" style={{ color: '#fb641b' }}></i> Zoro 24/7 Customer Help Desk
            </div>

            <div className="zoro-faq-item">
              <div className="zoro-faq-header" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                <span>How fast is Zoro Plus Delivery?</span>
                <i className={`bi ${openFaq === 1 ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </div>
              {openFaq === 1 && (
                <div className="zoro-faq-body">
                  Zoro Plus members enjoy Free 1-Day Express Shipping across tier-1 cities in India, and 2-Day delivery nationwide.
                </div>
              )}
            </div>

            <div className="zoro-faq-item">
              <div className="zoro-faq-header" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                <span>What is the 7-Day Replacement Guarantee?</span>
                <i className={`bi ${openFaq === 2 ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </div>
              {openFaq === 2 && (
                <div className="zoro-faq-body">
                  If your delivered item is damaged, defective, or incorrect, you can request an instant 1-click replacement within 7 days of delivery.
                </div>
              )}
            </div>

            <div className="zoro-faq-item">
              <div className="zoro-faq-header" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
                <span>What payment options are accepted?</span>
                <i className={`bi ${openFaq === 3 ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </div>
              {openFaq === 3 && (
                <div className="zoro-faq-body">
                  We accept Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, Cash on Delivery (COD), and Zoro Pay Later No-Cost EMI.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER SECTION */}
      <footer className="zoro-footer" data-aos="fade-up">
        <div className="zoro-footer-container">
          <div className="zoro-footer-col">
            <div className="zoro-footer-heading">ABOUT</div>
            <a href="#about" className="zoro-footer-link">Contact Us</a>
            <a href="#about" className="zoro-footer-link">About Us</a>
            <a href="#about" className="zoro-footer-link">Careers</a>
            <a href="#about" className="zoro-footer-link">Zoro Stories</a>
            <a href="#about" className="zoro-footer-link">Press Releases</a>
          </div>

          <div className="zoro-footer-col">
            <div className="zoro-footer-heading">HELP</div>
            <a href="#help" className="zoro-footer-link">Payments</a>
            <a href="#help" className="zoro-footer-link">Shipping</a>
            <a href="#help" className="zoro-footer-link">Cancellation & Returns</a>
            <a href="#help" className="zoro-footer-link">FAQ & Help Center</a>
          </div>

          <div className="zoro-footer-col">
            <div className="zoro-footer-heading">CONSUMER POLICY</div>
            <a href="#policy" className="zoro-footer-link">Cancellation & Return</a>
            <a href="#policy" className="zoro-footer-link">Terms Of Use</a>
            <a href="#policy" className="zoro-footer-link">Security & Privacy</a>
            <a href="#policy" className="zoro-footer-link">Sitemap</a>
          </div>

          <div className="zoro-footer-col">
            <div className="zoro-footer-heading">SOCIAL</div>
            <a href="#social" className="zoro-footer-link"><i className="bi bi-facebook"></i> Facebook</a>
            <a href="#social" className="zoro-footer-link"><i className="bi bi-twitter-x"></i> Twitter / X</a>
            <a href="#social" className="zoro-footer-link"><i className="bi bi-youtube"></i> YouTube</a>
            <a href="#social" className="zoro-footer-link"><i className="bi bi-instagram"></i> Instagram</a>
          </div>
        </div>

        <div className="zoro-footer-bottom">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="zoro-trust-feature">
              <i className="bi bi-shield-check" style={{ fontSize: 18 }}></i> 100% Original Products
            </div>
            <div className="zoro-trust-feature">
              <i className="bi bi-truck" style={{ fontSize: 18 }}></i> Free Shipping Available
            </div>
            <div className="zoro-trust-feature">
              <i className="bi bi-arrow-counterclockwise" style={{ fontSize: 18 }}></i> 7 Day Easy Return
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#878787', textAlign: 'center' }}>
            © 2026 Zoro.com - All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* MODAL / OVERLAY COMPONENTS */}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="zoro-toast">
          <i className="bi bi-info-circle-fill" style={{ color: '#ffe500' }}></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="zoro-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="zoro-modal-card" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={quickViewProduct.img} alt={quickViewProduct.name} style={{ maxWidth: '100%', maxHeight: 240, objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{quickViewProduct.name}</h3>

              <div className="zoro-rating-row">
                <div className="zoro-rating-pill">{quickViewProduct.rating} ★</div>
                <div className="zoro-rating-count">({quickViewProduct.reviews} reviews)</div>
              </div>

              <div className="zoro-price-row">
                <span className="zoro-current-price">₹{quickViewProduct.price.toLocaleString()}</span>
                <span className="zoro-original-price">₹{quickViewProduct.originalPrice.toLocaleString()}</span>
                <span className="zoro-discount-tag">{quickViewProduct.discount}</span>
              </div>

              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                Official Zoro Warranty included. Fast delivery guaranteed within 24 hours. Includes free cash on delivery option.
              </p>

              <button className="zoro-add-cart-btn" onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}>
                <i className="bi bi-cart-plus"></i> Buy Now / Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="zoro-lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="zoro-lightbox-content" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <div className="zoro-lightbox-close" onClick={() => setLightboxImg(null)}>
              <i className="bi bi-x-lg"></i>
            </div>
            <img src={lightboxImg} alt="Enlarged Showcase" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="zoro-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="zoro-modal-card" data-lenis-prevent onClick={(e) => e.stopPropagation()} style={{ gridTemplateColumns: '1fr 1fr', padding: 0, overflow: 'hidden' }}>
            <div style={{ background: '#2874f0', color: '#fff', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900 }}>Login to Zoro</h2>
                <p style={{ fontSize: 14, color: '#d0e0ff', marginTop: 12 }}>
                  Get access to your Orders, Wishlist and Recommendations
                </p>
              </div>
              <div style={{ fontSize: 13, color: '#ffe500', fontWeight: 800 }}>
                ⚡ Zoro Big Billion Days Live!
              </div>
            </div>

            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="zoro-form-group">
                <label className="zoro-form-label">Email / Mobile Number</label>
                <input type="text" className="zoro-form-input" placeholder="Enter Email / Mobile Number" />
              </div>

              <div style={{ fontSize: 11, color: '#878787' }}>
                By continuing, you agree to Zoro's Terms of Use and Privacy Policy.
              </div>

              <button
                className="zoro-submit-btn"
                style={{ background: '#fb641b', border: 'none' }}
                onClick={() => {
                  setShowLoginModal(false);
                  triggerToast('Logged in successfully to Zoro! Welcome back 👋');
                }}
              >
                Request OTP / Login
              </button>

              <button
                style={{ background: '#fff', border: '1px solid #e0e0e0', color: '#2874f0', fontWeight: 700, padding: 10, borderRadius: 4 }}
                onClick={() => setShowLoginModal(false)}
              >
                New to Zoro? Create an account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
