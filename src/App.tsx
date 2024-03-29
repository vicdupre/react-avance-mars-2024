import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ErrorBoundary from "./components/ErrorBoundary";
import usePersitedState from "./lib/hooks/useLocalState";
import useProducts from "./lib/stores/products";
import ProductsListTitle from "./components/ProductsListTitle";
import useCart from "./lib/stores/cart";
import Mouse from "./components/Mouse";
const FormExemple = lazy(
  () =>
    new Promise<any>((resolve) => {
      setTimeout(() => resolve(import("./components/FormExemple")), 3000);
    })
);
function App() {
  const [count, setCount] = usePersitedState<number>("count", 0);
  const [isPending, startTransition] = useTransition();

  const { products, loading, isLoaded, error, fetchData } = useProducts();
  const [maxId, setMaxId] = useState(5);

  // const [cart, dispatch] = useCart();
  const { cart, add } = useCart();
  console.log("cart", cart);

  const filteredProducts = useMemo(() => {
    return products.filter((el) => el.id < maxId);
  }, [products, maxId]);

  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
  }, [setCount]);

  useEffect(() => {
    if (!isLoaded) {
      startTransition(() => {
        fetchData();
      });
    }
  }, [isLoaded, fetchData]);

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  return (
    <>
      <div>
        <Mouse>
          {({ x, y }) => <p>Coordonnées de la souris : ({`${x};${y}`})</p>}
        </Mouse>
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
        <Suspense fallback={<p>Lazy loading...</p>}>
          <FormExemple />
        </Suspense>
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
      {loading && <p>Chargement...</p>}
      {error && <p>{error.message}</p>}
      <ProductsListTitle />
      <ul>
        {filteredProducts.map((product) => (
          <li onClick={() => add(product, 1)} key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
