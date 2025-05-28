// CartPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000/api/v1';

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (product_id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.product_id === product_id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (product_id) => {
    setCart(prev => prev.filter(item => item.product_id !== product_id));
  };

  const placeOrder = async () => {
    try {
      const user_id = 1;
      const created_at = new Date().toISOString();

      // 1) create the order
      const orderRes = await axios.post(
        `${API_URL}/orders`,
        { user_id, created_at }
      );
      const order_id = orderRes.data.data.insertId;

      // 2) create each order-item, sending total price = quantity × unit price
      for (const item of cart) {
        const totalPrice = item.quantity * parseFloat(item.price);
        await axios.post(`${API_URL}/orderitems`, {
          order_id,
          product_id: item.product_id,
          quantity: item.quantity.toString(),
          price: totalPrice.toString(),   // ← now the **total** price
        });
      }

      // 3) clear out the cart
      setCart([]);
      localStorage.removeItem('cart');
      setMessage('Order placed successfully! Redirecting...');

      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to place order.');
    }
  };

  const total = cart
    .reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <div className="shop-container cart-page">
      {/* Back & Title */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>🛒 Your Cart</h1>
      </div>

      {message && <p className="message">{message}</p>}

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.product_id} className="cart-item">
                <div className="item-info">
                  <img src={item.image_url} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.price} kr</p>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => updateQuantity(item.product_id, -1)}>–</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product_id, 1)}>＋</button>
                  <button className="remove" onClick={() => removeItem(item.product_id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout">
            <h4>Total: {total} kr</h4>
            <button className="checkout-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
