import { useState, useEffect } from 'react';
import axios from 'axios';
import './Adminpanel.css';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', brand: '', stock: '', image_url: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [auth, setAuth] = useState({ name: '', password: '' });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3000/api/v1';

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, auth);
      setToken(res.data.token);
    } catch (err) {
      alert("Login failed");
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data.data);
  };

  const searchProduct = async () => {
    if (!search) return fetchProducts();
    try {
      const res = await axios.get(`${API_URL}/products/${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data);
    } catch (err) {
      alert("Product not found");
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/products`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchProducts();
      setForm({ name: '', type: '', brand: '', stock: '', image_url: '', price: '' });
      setEditingId(null);
    } catch (err) {
      alert("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.product_id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    }
  };

  return (
    <div className="container">
      {!token ? (
        <div className="card login-card">
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={auth.name}
            onChange={(e) => setAuth({ ...auth, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <>
          <div className="card">
            <h2>Admin Panel – Manage Products</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              <input placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <button type="submit">{editingId ? "Update" : "Create"} Product</button>
            </form>
          </div>

          <div className="card">
            <h3>Products</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={searchProduct}>Search</button>
            </div>
            <ul className="product-list compact">
              {products.map((p) => (
                <li key={p.product_id} className="product-item">
                  <div>
                    <strong>{p.name}</strong> – {p.price} kr
                  </div>
                  <div>
                    <button onClick={() => handleEdit(p)}>✎</button>
                    <button onClick={() => handleDelete(p.product_id)} className="danger">🗑</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
