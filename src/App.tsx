import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Products } from "./lib/types/types";
import FormExemple from "./components/FormExemple";
import ErrorBoundary from "./components/ErrorBoundary";
import usePersitedState from "./lib/hooks/useLocalState";
import { CartContext, addToCart } from "./lib/contexts/CartContext";

function App() {
  const [count, setCount] = usePersitedState<number>("count", 0);
  const [products, setProducts] = useState<Products>([]);
  const [maxId, setMaxId] = useState(5);

  const [cart, dispatch] = useContext(CartContext);
  console.log("cart", cart);

  const filteredProducts = useMemo(() => {
    return products.filter((el) => el.id < maxId);
  }, [products, maxId]);

  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  useEffect(() => {
    /* const getData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    };
    getData(); */
    (async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    })();
  }, []);

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <ErrorBoundary>
        <FormExemple />
      </ErrorBoundary>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={() => setMaxId((maxId) => (maxId > 1 ? maxId - 1 : 1))}
        >
          -
        </button>
        {maxId}
        <button
          onClick={() =>
            setMaxId((maxId) =>
              maxId < products.length ? maxId + 1 : products.length
            )
          }
        >
          +
        </button>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li onClick={() => dispatch(addToCart(product, 1))} key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
