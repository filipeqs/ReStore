import { useEffect, useState } from 'react';
import { Product } from '../models/products';

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
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
