"use client";

import { updatePost } from "@/lib/postsActions";
import { Post } from "@/lib/types";
import SubmitButton from "@/ui/Buttons/SubmitButton";
import { useFormState } from "react-dom";
import styles from "./posts.module.css";

type Props = {
  post?: Post;
  action: (
    prevData: any,
    formData: FormData
  ) => Promise<{
    errors: string[];
    errorCount: number;
  }>;
};

const initialState = {
  errors: [],
  errorCount: 0,
};

const PostForm = ({ post, action }: Props) => {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form className={`${styles.main}`} action={formAction}>
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
        defaultValue={post?.title}
      />
      <label htmlFor="content">Contenu</label>
      <textarea
        name="content"
        id="title"
        required
        defaultValue={post?.content}
      ></textarea>
      <SubmitButton />
    </form>
  );
};

export default PostForm;
