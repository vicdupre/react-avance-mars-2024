import { Products } from "@/lib/types";

const getArticles = async (): Promise<Products> => {
  const res = await fetch("https://fakestoreapi.com/products");
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
            <a href={`/articles/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
