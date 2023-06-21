import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Fetch the product data based on the productId
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the retrieved product data
        if (data.name) {
          setName(data.name);
        }
        if (data.price) {
          setPrice(data.price);
        }
        if (data.description) {
          setDescription(data.description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  // Handle form submission for updating the product
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      price,
      description,
    };

    // Make an API request to update the product
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/updateproduct`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // Reset the form
        setName('');
        setPrice('');
        setDescription('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

     return (
       <div>
         <h2>Update Product</h2>
         <form onSubmit={handleSubmit}>
           <div>
             <label htmlFor="productId">Product ID:</label>
             <input
               type="text"
               id="productId"
               value={productId}
               readOnly
             />
           </div>
           <div>
             <label htmlFor="name">Name:</label>
             <input
               type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
             />
           </div>
           <div>
             <label htmlFor="price">Price:</label>
             <input
               type="text"
               id="price"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
             />
           </div>
           <div>
             <label htmlFor="description">Description:</label>
             <textarea
               id="description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
             ></textarea>
           </div>
           <button type="submit">Update</button>
         </form>
       </div>
     );
   };

export default UpdateProduct;
