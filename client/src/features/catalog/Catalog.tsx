import { useState, useEffect } from 'react';
import { Product } from '../../app/models/products';
import ProductList from './ProductList';

export default function Catalog() {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
