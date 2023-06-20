import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products from the server
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log('Error fetching products:', error));
  }, []);

  const handleCreateProduct = () => {
    // Handle the create product logic here
    // You can show a form and handle the form submission
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={handleCreateProduct}>Create Product</button>

      <h2>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
