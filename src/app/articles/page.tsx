import { Products } from "@/lib/types";
import ErrorButton from "@/ui/Buttons/ErrorButton";
import Link from "next/link";

const getArticles = async (): Promise<Products> => {
  // await new Promise<void>((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(process.env.APP_URL + "/api/articles");
  const json = await res.json();
  console.log(json);
  return json;
};

const Articles = async () => {
  const articles = await getArticles();
  return (
    <div>
      <h1>Liste des articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <ErrorButton />
    </div>
  );
};

export default Articles;
