import React, { useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the product object
    const product = {
      name,
      price,
      description,
    };

    // Send the product data to the server for creation
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data); // Log the response for debugging
        // Add any additional logic based on the response
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occurred during the request
      });

    // Reset the form inputs
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">Create Product</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
