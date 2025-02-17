import { useState } from "react";
import "./App.css";

const productList = [
  {
    id: "1111222",
    productName: "Keyboard",
    stock: 10,
    price: 2000,
  },
  {
    id: "1111223",
    productName: "Mouse",
    stock: 5,
    price: 1500,
  },
  {
    id: "1111224",
    productName: "Headphone",
    stock: 8,
    price: 2500,
  },
];

const TableRow = ({
  id,
  productName,
  stock,
  price,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button onClick={() => increment(id)} disabled={quantity === stock}>
          +
        </button>
        <button onClick={() => decrement(id)} disabled={quantity === 0}>
          -
        </button>
      </td>
    </tr>
  );
};

function App() {
  const [products, setProducts] = useState(
    productList.map((product) => ({
      ...product,
      quantity: 0,
      total: 0,
    }))
  );

  const incrementQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id && product.stock > product.quantity) {
          product.quantity++;
          product.total = product.price * product.quantity;
        }
        return product;
      })
    );
  };

  const decrementQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id && product.quantity > 0) {
          product.quantity--;
          product.total = product.price * product.quantity;
        }
        return product;
      })
    );
  };

  return (
    <>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              {...product}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
