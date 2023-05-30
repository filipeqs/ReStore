import { useEffect, useState } from 'react';
import { Product } from '../models/products';
import Catalog from '../../features/catalog/Catalog';
import { Typography } from '@mui/material';

function App() {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  function addProduct() {
    setProduct((prev) => [
      ...products,
      {
        id: prev.length + 101,
        name: 'product3',
        price: 300.0,
        brand: 'Some Brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200',
      },
    ]);
  }

  return (
    <>
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </>
  );
}

export default App;
