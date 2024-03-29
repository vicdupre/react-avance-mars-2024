import { getPosts } from "@/lib/postsActions";
import Link from "next/link";

const _Posts = async () => {
  const posts = await getPosts();
  return (
    <div>
      <h1>Posts</h1>
      <Link href={"/posts/create"}>Ajouter un post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default _Posts;
