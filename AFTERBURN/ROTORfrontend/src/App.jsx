import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (json.success) setProducts(json.data);
      })
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const featured = products.slice(0, 7);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">AFTERBURN</div>
      </nav>

      <header className="hero">
        <h1>Agility and Speed</h1>
        <p>AFTERBURN is the future of private air travel.</p>
        <Link to="/sale" className="cta-btn">Explore aircraft</Link>
      </header>

      <section className="featured-aircraft">
        <h2>Featured Aircraft</h2>
        <div className="fan-container">
          {featured.map((p, i) => {
            const mid = (featured.length - 1) / 2;
            const offset = (i - mid) * 20;    
            const rotation = (i - mid) * 5;
            return (
              <Link
                key={p.product_id}
                to="/sale"
                className="fan-card"
                style={{
                  backgroundImage: `url(${p.image_url})`,
                  transform: `translateX(${offset}px) rotate(${rotation}deg)`,
                  zIndex: i,
                }}
              >
                <div className="card-label">{p.name}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="features">
        <h2>Why AFTERBURN?</h2>
        <div className="cards">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>From fighters to freighters, choose your ride.</p>
          </div>
          <div className="feature-card">
            <h3>On-Demand</h3>
            <p>Ready when you are—anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <h3>Transparent Pricing</h3>
            <p>No hidden fees, ever.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 AFTERBURN • Crafted by A&BURN</p>
      </footer>
    </div>
  );
}
