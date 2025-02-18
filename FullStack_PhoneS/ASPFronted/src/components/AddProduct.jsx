import { useState } from 'react';

function AddProduct() {
  const [data, setData] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  const handleChange = ({ target: { name, value } }) =>
    setData(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setMessage(`Product: ${data.name} added successfully!`);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={data.name} onChange={handleChange} />
        <label>Price:</label>
        <input type="number" name="price" value={data.price} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProduct;
