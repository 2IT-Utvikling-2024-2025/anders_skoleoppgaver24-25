import { useNavigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import DeleteProduct from './components/DeleteProduct';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <button className="navigate-button" onClick={() => navigate('/homepage')}>
        Go to Homepage
      </button>
      <div className="component-container">
        <ProductList />
        <DeleteProduct />
        <AddProduct />
        <EditProduct />
      </div>
    </div>
  );
}

export default App;
