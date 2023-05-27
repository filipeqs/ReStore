const products = [
  {
    name: 'product1',
    price: 100.0,
  },
  {
    name: 'product2',
    price: 200.0,
  },
];

function App() {
  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, i) => (
          <li key={i}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
