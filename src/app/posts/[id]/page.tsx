import { getPost, updatePost } from "@/lib/postsActions";
import PostForm from "../PostForm";

const UpdatePost = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const post = await getPost(id);
  const updatePostWithId = updatePost.bind(null, post._id);
  return (
    <div>
      <h1>Post</h1>
      <PostForm post={post} action={updatePostWithId} />
    </div>
  );
};

export default UpdatePost;
