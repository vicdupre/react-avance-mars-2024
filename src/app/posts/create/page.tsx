import { createPost } from "@/lib/postsActions";
import PostForm from "../PostForm";

const CreatePost = () => {
  return (
    <div>
      <h1>Créer un nouveau post</h1>
      <PostForm action={createPost} />
    </div>
  );
};

export default CreatePost;
