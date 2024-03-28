import useProducts from "../lib/stores/products";

const ProductsListTitle = () => {
  const { isLoaded, products } = useProducts(({ isLoaded, products }) => ({
    isLoaded,
    products,
  }));
  return isLoaded ? <h2>{products.length} articles disponibles</h2> : null;
};

export default ProductsListTitle;
