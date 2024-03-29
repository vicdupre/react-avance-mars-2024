"use client";

import { updatePost } from "@/lib/postsActions";
import { Post } from "@/lib/types";
import SubmitButton from "@/ui/Buttons/SubmitButton";
import { useFormState } from "react-dom";

type Props = {
  post: Post;
};

const initialState = {
  errors: [],
  errorCount: 0,
};

const UpdatePostForm = ({ post }: Props) => {
  const updatePostWithId = updatePost.bind(null, post._id);

  const [state, action] = useFormState(updatePostWithId, initialState);

  return (
    <form action={action}>
      {state.errors.length > 0 && (
        <ul
          style={{
            backgroundColor: "tomato",
          }}
        >
          {state.errors.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      )}

      {state.errorCount >= 3 && (
        <h2 style={{ color: "tomato" }}>Faites un effort</h2>
      )}
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        name="title"
        id="title"
        required
        defaultValue={post.title}
      />
      <label htmlFor="content">Contenu</label>
      <textarea
        name="content"
        id="title"
        required
        defaultValue={post.content}
      ></textarea>
      <SubmitButton />
    </form>
  );
};

export default UpdatePostForm;
