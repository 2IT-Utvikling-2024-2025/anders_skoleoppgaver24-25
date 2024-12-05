let content;

const products = [
  { title: 'Hvalbiff', Hvalcheck: true, id: 1 },
  { title: 'Hvallever', Hvalcheck: false, id: 2 },
  { title: 'Hvalnyre', Hvalcheck: false, id: 3 }
];
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);