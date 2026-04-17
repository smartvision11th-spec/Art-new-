import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Instagram, Youtube, Twitter, Facebook, CheckCircle, Plus, Minus, X } from 'lucide-react';

const ArtGallery = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const placeOrderRef = useRef(null);

  // Sample artwork data
  const artworks = [
    {
      id: 1,
      title: 'Midnight Dreams',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1577720643272-265e434f0ce1?w=500&h=500&fit=crop',
      artist: 'Aman Singh'
    },
    {
      id: 2,
      title: 'Golden Horizon',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1578462996442-48f60103fc96?w=500&h=500&fit=crop',
      artist: 'Priya Sharma'
    },
    {
      id: 3,
      title: 'Abstract Serenity',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1578462996442-48f60103fc96?w=500&h=500&fit=crop',
      artist: 'Vikram Das'
    },
    {
      id: 4,
      title: 'Chromatic Essence',
      price: 20000,
      image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=500&h=500&fit=crop',
      artist: 'Neha Gupta'
    },
    {
      id: 5,
      title: 'Whispers of Nature',
      price: 16000,
      image: 'https://images.unsplash.com/photo-1578462996442-48f60103fc96?w=500&h=500&fit=crop',
      artist: 'Arjun Patel'
    },
    {
      id: 6,
      title: 'Urban Reverie',
      price: 14000,
      image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop',
      artist: 'Divya Nair'
    }
  ];

  const reviews = [
    {
      name: 'Ananya Kapoor',
      review: 'Absolutely loved the detailing. It feels alive in my living room. The colors are more vibrant than expected!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Rohan Mehta',
      review: 'Delivery was smooth and the artwork exceeded expectations. The packaging was premium and the piece arrived in perfect condition.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Sakshi Verma',
      review: 'This is truly a masterpiece. I bought it as a gift and it was the most thoughtful present. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1517841905240-1c28a37de6ca?w=100&h=100&fit=crop'
    },
    {
      name: 'Karan Singh',
      review: 'The emotion in the artwork speaks volumes. It\'s not just a purchase, it\'s an investment in art and culture.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (artwork) => {
    const existingItem = cart.find(item => item.id === artwork.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...artwork, quantity: 1 }]);
    }
    setShowCartPanel(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    setOrderPlacing(true);
    
    // Simulate 3 second delivery animation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderPlacing(false);
    setOrderSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setOrderSuccess(false);
      setCurrentPage('home');
      setCart([]);
      setFormData({ name: '', address: '', phone: '' });
    }, 3000);
  };

  // Animated Scroll Element
  const ScrollFadeInSection = ({ children, className = '' }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${className}`}
      >
        {children}
      </div>
    );
  };

  // HOME PAGE
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@400;600&family=Caveat:wght@700&display=swap');
          
          * {
            font-family: 'Cormorant Garamond', serif;
          }

          .serif-heading {
            font-family: 'Playfair Display', serif;
            font-weight: 900;
            letter-spacing: -1px;
          }

          .artistic-font {
            font-family: 'Caveat', cursive;
            font-size: 2.5rem;
            color: #C8A96A;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(200, 169, 106, 0.3); }
            50% { box-shadow: 0 0 40px rgba(200, 169, 106, 0.6); }
          }

          @keyframes zoomHover {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-100px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes bounceWheels {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          @keyframes roadLines {
            0% { background-position: 0 0; }
            100% { background-position: 0 30px; }
          }

          .hero-gradient {
            background: linear-gradient(135deg, #0F0F0F 0%, #3A2F2F 50%, #C8A96A 100%);
            background-size: 400% 400%;
            animation: gradientFlow 15s ease infinite;
          }

          .soft-gradient {
            background: linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%);
          }

          .cta-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .cta-btn:hover {
            animation: glowPulse 2s ease-in-out infinite;
            transform: scale(1.02);
          }

          .art-card {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            background: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .art-card:hover {
            box-shadow: 0 20px 50px rgba(200, 169, 106, 0.25);
            transform: translateY(-8px);
          }

          .art-card img {
            transition: transform 0.5s ease;
            width: 100%;
            height: 300px;
            object-fit: cover;
          }

          .art-card:hover img {
            transform: scale(1.08);
          }

          .buy-btn {
            background: linear-gradient(135deg, #0F0F0F 0%, #3A2F2F 100%);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .buy-btn:hover {
            background: linear-gradient(135deg, #C8A96A 0%, #D4B77F 100%);
            box-shadow: 0 8px 20px rgba(200, 169, 106, 0.4);
            transform: translateY(-2px);
          }

          .review-card {
            background: white;
            border-left: 4px solid #C8A96A;
            transition: all 0.4s ease;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          }

          .review-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(200, 169, 106, 0.15);
          }

          .parallax {
            transition: transform 0.6s ease-out;
          }

          .nav-item {
            transition: all 0.3s ease;
            position: relative;
          }

          .nav-item:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #C8A96A;
            transition: width 0.3s ease;
          }

          .nav-item:hover:after {
            width: 100%;
          }

          .loading-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            flex-direction: column;
            gap: 20px;
          }

          .road {
            width: 100%;
            height: 80px;
            background: #2C2C2C;
            position: relative;
            overflow: hidden;
            border-radius: 40px;
            box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
          }

          .road::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            background: repeating-linear-gradient(
              90deg,
              white 0px,
              white 20px,
              transparent 20px,
              transparent 40px
            );
            animation: roadLines 1s linear infinite;
            opacity: 0.8;
          }

          .delivery-van {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 80px;
            height: 50px;
            animation: slideInLeft 0.6s ease-out forwards, bounceWheels 0.8s ease-in-out 0.6s infinite;
          }

          .van-body {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%);
            border-radius: 12px 4px 4px 12px;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          .van-window {
            position: absolute;
            top: 8px;
            left: 45%;
            width: 20px;
            height: 12px;
            background: #87CEEB;
            border-radius: 2px;
          }

          .van-wheel {
            position: absolute;
            width: 16px;
            height: 16px;
            background: #1a1a1a;
            border-radius: 50%;
            bottom: -8px;
          }

          .van-wheel.front {
            right: 8px;
            animation: spin 0.8s linear infinite;
          }

          .van-wheel.back {
            left: 8px;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>

        {/* HEADER */}
        <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md z-40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="serif-heading text-2xl text-gray-900">artistry</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              ← Back
            </button>
          </div>
        </nav>

        {/* LOADING ANIMATION */}
        {orderPlacing && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8">
            <div style={{ width: '300px' }}>
              <div style={{
                background: '#2C2C2C',
                height: '80px',
                borderRadius: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '4px',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  background: 'repeating-linear-gradient(90deg, white 0px, white 20px, transparent 20px, transparent 40px)',
                  animation: 'roadLines 1s linear infinite',
                  opacity: '0.8'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  width: '80px',
                  height: '50px',
                  animation: 'slideInLeft 0.6s ease-out forwards, bounceWheels 0.8s ease-in-out 0.6s infinite'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)',
                    borderRadius: '12px 4px 4px 12px',
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '45%',
                      width: '20px',
                      height: '12px',
                      background: '#87CEEB',
                      borderRadius: '2px'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      background: '#1a1a1a',
                      borderRadius: '50%',
                      bottom: '-8px',
                      left: '8px',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      background: '#1a1a1a',
                      borderRadius: '50%',
                      bottom: '-8px',
                      right: '8px',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
            <style>{`
              @keyframes roadLines {
                0% { background-position: 0 0; }
                100% { background-position: 0 30px; }
              }
              @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-100px); }
                to { opacity: 1; transform: translateX(0); }
              }
              @keyframes bounceWheels {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <div className="text-center">
              <p className="serif-heading text-2xl text-gray-800">Processing Your Order</p>
              <p className="text-gray-600 mt-2">Your artwork is on the way...</p>
            </div>
          </div>
        )}

        {/* SUCCESS ANIMATION */}
        {orderSuccess && (
          <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-green-100 z-50 flex flex-col items-center justify-center gap-6">
            <div style={{
              animation: 'bounce 1s infinite',
              display: 'inline-block'
            }}>
              <CheckCircle size={80} className="text-green-500" />
            </div>
            <div className="text-center">
              <p className="serif-heading text-3xl text-gray-800">Order Placed Successfully! 🎉</p>
              <p className="text-gray-700 mt-3 text-lg">Your artwork is on its way!</p>
              <p className="text-gray-600 mt-2">Thank you for supporting artists.</p>
            </div>
            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
            `}</style>
          </div>
        )}

        {/* CHECKOUT CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORM */}
            <div className="lg:col-span-2">
              <div className="checkout-card mb-8">
                <h2 className="serif-heading text-3xl mb-8">Delivery Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Address</label>
                    <textarea
                      className="input-field resize-none h-24"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-card">
                <h2 className="serif-heading text-3xl mb-6">Payment Method</h2>
                <div className="p-6 border-2 border-green-500 rounded-lg bg-green-50">
                  <div className="flex items-center gap-4">
                    <input type="radio" id="cod" name="payment" checked readOnly className="w-5 h-5" />
                    <label htmlFor="cod" className="text-lg font-bold text-gray-800 cursor-pointer">
                      💳 Cash on Delivery (COD)
                    </label>
                  </div>
                  <p className="text-gray-600 mt-3 ml-9">Pay when your artwork arrives at your doorstep</p>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div className="checkout-card sticky top-24">
                <h2 className="serif-heading text-2xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="serif-heading text-2xl">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  ref={placeOrderRef}
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-lg hover:shadow-xl transition transform hover:scale-105"
                >
                  🚀 Place Order
                </button>
                
                <button
                  onClick={() => setCurrentPage('home')}
                  className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p>&copy; 2024 Artistry. Curated with love. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
};

export default ArtGallery;

        {/* LOADING STATE - ORDER ANIMATION */}
        {orderPlacing && (
          <div className="loading-animation">
            <div className="road" style={{ width: '300px' }}>
              <div className="delivery-van">
                <div className="van-body">
                  <div className="van-window"></div>
                  <div className="van-wheel back"></div>
                  <div className="van-wheel front"></div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="serif-heading text-2xl text-gray-800">Processing Your Order</p>
              <p className="text-gray-600 mt-2">Your artwork is on the way...</p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {orderSuccess && (
          <div className="loading-animation bg-gradient-to-b from-green-50 to-green-100">
            <div className="animate-bounce">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            <div className="text-center">
              <p className="serif-heading text-3xl text-gray-800">Order Placed Successfully! 🎉</p>
              <p className="text-gray-700 mt-3 text-lg">Your artwork is on its way!</p>
              <p className="text-gray-600 mt-2">Thank you for supporting artists.</p>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md z-40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="serif-heading text-2xl text-gray-900">artistry</h1>
            <div className="flex gap-8 items-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="nav-item text-gray-700 font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => setShowCartPanel(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6">
          <div className="hero-gradient rounded-3xl overflow-hidden py-32 px-8 text-center relative">
            <div className="parallax" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
              <div className="max-w-4xl mx-auto">
                <p className="artistic-font mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  हर रंग में भावना
                </p>
                <h1 
                  className="serif-heading text-5xl md:text-7xl text-white mb-6 animate-fadeInUp"
                  style={{ animationDelay: '0.2s' }}
                >
                  Art jo sirf dekha nahi,<br />mehsoos kiya jaata hai
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  Not just art. It's a feeling.
                </p>
                <button
                  onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                  className="cta-btn px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg inline-block animate-fadeInUp"
                  style={{ animationDelay: '0.4s' }}
                >
                  ✨ Explore Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STORY */}
        <ScrollFadeInSection className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="serif-heading text-4xl mb-8 text-gray-900">
            Our Journey
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            We believe that art is not just a decoration—it's a <span className="text-yellow-700 font-bold">conversation between the artist and your soul</span>.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Each piece in our collection tells an untold story through colors, textures, and emotions. We curate artworks from emerging and established artists who pour their hearts into every brushstroke.
          </p>
          <div className="artistic-font mb-6">
            "Art speaks when words fail"
          </div>
        </ScrollFadeInSection>

        {/* ART GALLERY SECTION */}
        <section id="gallery" className="max-w-7xl mx-auto px-6 py-20">
          <ScrollFadeInSection>
            <h2 className="serif-heading text-5xl text-center mb-20 text-gray-900">
              Featured Collections
            </h2>
          </ScrollFadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {artworks.map((art, idx) => (
              <ScrollFadeInSection key={art.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="art-card group">
                  <div className="relative overflow-hidden h-80">
                    <img src={art.image} alt={art.title} />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="serif-heading text-2xl text-gray-900 mb-2">{art.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">by {art.artist}</p>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-bold text-gray-900">₹{art.price.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => addToCart(art)}
                      className="buy-btn w-full py-3 text-white font-bold rounded-lg text-lg transition"
                    >
                      🛒 Buy Now
                    </button>
                  </div>
                </div>
              </ScrollFadeInSection>
            ))}
          </div>
        </section>

        {/* PSYCHOLOGICAL CONVERSION */}
        <ScrollFadeInSection className="max-w-6xl mx-auto px-6 py-20 my-10">
          <div className="soft-gradient rounded-3xl p-16 text-center">
            <p className="artistic-font text-3xl mb-6">
              हर artwork एक कहानी है...
            </p>
            <h3 className="serif-heading text-4xl text-gray-900 mb-6">
              क्या ये आपकी हो सकती है?
            </h3>
            <p className="text-xl text-gray-700 mb-4">
              Own something that speaks before you do.
            </p>
            <p className="text-gray-600 text-lg">
              Join hundreds of art lovers who've found their perfect piece and transformed their spaces into galleries of emotion.
            </p>
          </div>
        </ScrollFadeInSection>

        {/* REVIEWS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <ScrollFadeInSection className="text-center mb-16">
            <h2 className="serif-heading text-5xl text-gray-900 mb-4">What Art Lovers Say</h2>
            <p className="text-xl text-gray-600">Authentic stories from our community</p>
          </ScrollFadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
              <ScrollFadeInSection key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="review-card">
                  <div className="flex items-center mb-4 gap-4">
                    <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover" />
                    <div className="text-left">
                      <h4 className="serif-heading text-lg text-gray-900">{review.name}</h4>
                      <div className="text-yellow-500">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">"{review.review}"</p>
                </div>
              </ScrollFadeInSection>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="serif-heading text-2xl mb-4">artistry</h3>
                <p className="text-gray-400">Curating emotions through art.</p>
              </div>
              <div>
                <h4 className="serif-heading text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="serif-heading text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-yellow-600 transition"><Instagram size={24} /></a>
                  <a href="#" className="hover:text-yellow-600 transition"><Youtube size={24} /></a>
                  <a href="#" className="hover:text-yellow-600 transition"><Twitter size={24} /></a>
                  <a href="#" className="hover:text-yellow-600 transition"><Facebook size={24} /></a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
              <p>&copy; 2024 Artistry. Curated with love. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* CART PANEL */}
        {showCartPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end">
            <div className="bg-white w-full md:w-96 overflow-y-auto animate-slideInRight">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="serif-heading text-2xl">Shopping Cart</h2>
                <button onClick={() => setShowCartPanel(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="p-6 text-center py-20">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="p-6 space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex gap-4 mb-4">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="serif-heading text-lg">{item.title}</h4>
                            <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded">
                            <Minus size={18} />
                          </button>
                          <span className="flex-1 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded">
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="serif-heading text-3xl">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCartPanel(false);
                        setCurrentPage('checkout');
                      }}
                      className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-lg hover:shadow-lg transition"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // CHECKOUT PAGE
  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@400;600&family=Caveat:wght@700&display=swap');
          
          * {
            font-family: 'Cormorant Garamond', serif;
          }

          .serif-heading {
            font-family: 'Playfair Display', serif;
            font-weight: 900;
            letter-spacing: -1px;
          }

          .input-field {
            border: 2px solid #e5e7eb;
            transition: all 0.3s ease;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 1rem;
            width: 100%;
          }

          .input-field:focus {
            outline: none;
            border-color: #C8A96A;
            box-shadow: 0 0 0 3px rgba(200, 169, 106, 0.1);
          }

          .checkout-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #f3f4f6;
          }
        `}