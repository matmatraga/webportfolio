import ProductCard from '../components/ProductCard.js';
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default function Products() {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/active`)
      .then(result => result.json())
      .then(data => {
          setProducts(
            data.map((product) => (
              <ProductCard key={product._id} productProp={product} />
            ))
          );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="text-center mt-3">Products</h1>
      {products}

    </>
  )
}