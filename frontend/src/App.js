import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editId, setEditId] = useState(null);
  

  
  useEffect(() => {
    fetchProducts();
  }, []);

 
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to add a new product
  const addProduct = async () => {
    try {
      await axios.post('http://localhost:4000/add', formData);
      fetchProducts(); 
      setFormData({ title: '', description: '', image: '' }); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:4000/update/${editId}`, formData);
      fetchProducts();
      setEditId(null); 
      setFormData({ title: '', description: '', image: '' }); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


 
  const handleSubmit = (e) => {
    e.preventDefault();
    editId ? updateProduct() : addProduct();
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      image: product.image,
    });
  };

  return (
    <div className="app-container">
      <h1>Disaster</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          rows="4"
        ></textarea>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit" className="submit-button">
          {editId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h2>List of Disaster</h2>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product)} className="edit-button">
              Edit
            </button>
            <button onClick={() => deleteProduct(product.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
