import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export default function App() {
  const [products, setProducts]     = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart]             = useState(
    () => JSON.parse(localStorage.getItem('cart')) || []
  );
  const [wishlist, setWishlist]     = useState(
    () => JSON.parse(localStorage.getItem('wishlist')) || []
  );
  const [theme, setTheme]           = useState('dark');
  const cursorRef = useRef(null);
  const navigate   = useNavigate();
  const API        = 'http://localhost:3000/api/v1';

  // Fetch products once
  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data.data))
      .catch(console.error);
  }, []);

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Custom cursor
  useEffect(() => {
    const onMouseMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const addToCart = p => {
    setCart(prev => {
      const exists = prev.find(i => i.product_id === p.product_id);
      if (exists) {
        return prev.map(i =>
          i.product_id === p.product_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const toggleWishlist = p => {
    setWishlist(prev =>
      prev.find(i => i.product_id === p.product_id)
        ? prev.filter(i => i.product_id !== p.product_id)
        : [...prev, p]
    );
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="App">
      {/* NAVBAR */}
      <header className="site-header glass">
        <div className="logo">
          A<span>store</span>
        </div>
        <nav>
          <ul>
            <li><a onClick={()=>navigate('/')}>Home</a></li>
            <li><a onClick={()=>navigate('/cart')}>Cart ({cartCount})</a></li>
            <li><a onClick={()=>navigate('/wishlist')}>Wishlist ({wishlist.length})</a></li>
            <li><a onClick={()=>navigate('/admin')}>Admin</a></li>
          </ul>
        </nav>
        <div className="controls">
          <input
            className="search"
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1>
            Your one-stop <span className="gradient-text">shopping</span> destination
          </h1>
          <p>Explore our full catalog below.</p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <main className="products-grid">
        {filtered.map(p => (
          <div className="card glass" key={p.product_id}>
            <img src={p.image_url} alt={p.name} />
            <div className="card-info">
              <h3>{p.name}</h3>
              <p className="brand">{p.brand}</p>
              <p className="price">{p.price} kr</p>
            </div>
            <div className="buttons">
              <button className="add-btn" onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="no-result">No products found.</div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        © {new Date().getFullYear()} Astore. All rights reserved.
      </footer>

      {/* CUSTOM CURSOR */}
      <div className="cursor" ref={cursorRef}></div>
    </div>
  );
}
