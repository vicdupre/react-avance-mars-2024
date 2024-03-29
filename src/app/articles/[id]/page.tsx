import { Product } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

const getArticle = async (id: string): Promise<Product> => {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 3000));
    const res = await fetch("https://fakestoreapi.com/products/" + id);
    const json = await res.json();
    return json;
  } catch (error) {
    notFound();
  }
};

const Article = async ({ params: { id } }: Props) => {
  const product = await getArticle(id);
  return (
    <main>
      <h1>{product.title}</h1>
      <div>
        <p> Price : {product.price.toFixed(2)}€ </p>
        <p> Description : {product.description} </p>
        <p> Category : {product.category} </p>
        <p> Rating : {product.rating.rate} </p>
        <p> Rating count : {product.rating.count} </p>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
        />
      </div>
    </main>
  );
};

export default Article;
