import { getPost } from "@/lib/postsActions";
import UpdatePostForm from "./UpdatePostForm";

const UpdatePost = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const post = await getPost(id);

  return (
    <div>
      <h1>Post</h1>
      <UpdatePostForm post={post} />
    </div>
  );
};

export default UpdatePost;
