import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SalePage.css';

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (json.success) setProducts(json.data);
        else throw new Error('API returned success: false');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const types = Array.from(new Set(products.map(p => p.type)));
  const filtered = products
    .filter(p => !filterType || p.type === filterType)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addToCart = product => {
    setCart(prev => {
      const exist = prev[product.product_id] || { product, quantity: 0 };
      return { ...prev, [product.product_id]: { ...exist, quantity: exist.quantity + 1 } };
    });
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const entry = prev[id];
      if (!entry) return prev;
      const qty = entry.quantity + delta;
      if (qty < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...entry, quantity: qty } };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, { quantity }) => sum + quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, { product, quantity }) => sum + quantity * Number(product.price), 0);

  const checkout = () => {
    alert(`Checked out ${totalItems} items for $${totalPrice.toFixed(2)}`);
    setCart({});
  };

  if (loading) return <p className="loading">Loading products…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>
      <header className="header">
        <h1>Aircraft Sale</h1>
        <Link to="/" className="home-button">← Home</Link>
      </header>
      <div className="container">
        <section className="products">
          <div className="filter-search">
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input
              type="text"
              placeholder="Search by name…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="products-grid">
            {filtered.map(p => (
              <div key={p.product_id} className="product-card">
                <img src={p.image_url} alt={p.name} />
                <div className="info">
                  <h2>{p.name}</h2>
                  <p>Brand: {p.brand}</p>
                  <p>Type: {p.type}</p>
                  <p className="price">${Number(p.price).toLocaleString()}</p>
                  <button onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="cart">
          <h2>Your Cart</h2>
          {!totalItems ? (
            <p>No items in cart</p>
          ) : (
            <>
              {Object.entries(cart).map(([id, { product, quantity }]) => (
                <div key={id} className="cart-item">
                  <strong>{product.name}</strong>
                  <div className="qty-controls">
                    <button onClick={() => changeQty(product.product_id, -1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => changeQty(product.product_id, 1)}>+</button>
                  </div>
                  <p className="subtotal">${(quantity * Number(product.price)).toFixed(2)}</p>
                </div>
              ))}
              <p className="cart-total">Total ({totalItems} items): ${totalPrice.toFixed(2)}</p>
              <button className="checkout" onClick={checkout}>Checkout</button>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default SalePage;