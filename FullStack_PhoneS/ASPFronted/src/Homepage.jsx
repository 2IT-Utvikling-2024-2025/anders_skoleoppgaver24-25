import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bgColor, setBgColor] = useState(255); 

  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/products/');
        const results = await response.json();
        setProducts(results.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

 
  useEffect(() => {
    let increasing = false;

    const changeColor = () => {
      setBgColor(prevColor => {
        if (prevColor <= 50) increasing = true;
        if (prevColor >= 255) increasing = false;

        return increasing ? prevColor + 1 : prevColor - 1;
      });
    };

    const interval = setInterval(changeColor, 50);
    return () => clearInterval(interval);
  }, []);

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="homepage-container" 
      style={{ backgroundColor: `rgb(${bgColor}, ${bgColor}, ${bgColor})` }} 
    >
      
      <div className="brand-name">AS Phones</div>

      
      <button className="navigate-button" onClick={() => navigate('/')}>
        Return to Admin
      </button>

      
      <input
        type="text"
        placeholder="Search for a product..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.product_id} className="product-card">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
