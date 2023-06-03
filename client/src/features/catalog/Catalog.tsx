import { useState, useEffect } from 'react';
import { Product } from '../../app/models/products';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import Loading from '../../app/layout/Loading';

export default function Catalog() {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProduct(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
