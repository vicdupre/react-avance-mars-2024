"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Posts } from "./types";
import { z } from "zod";

const PostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
});

const NewPost = PostSchema.omit({ _id: true });

export const createPost = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  try {
    const verifiedData = NewPost.parse(data);
    const res = await fetch(
      "https://crudcrud.com/api/1790f08c0db54c68b170d69cc0a10bb9/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifiedData),
      }
    );
    if (!res.ok) {
      throw new Error("Erreur lors de l'enregistrement");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erreur");
  }

  revalidatePath("/posts");
  redirect("/posts");
};

export const getPosts = async (): Promise<Posts> => {
  const res = await fetch(
    "https://crudcrud.com/api/1790f08c0db54c68b170d69cc0a10bb9/posts"
  );
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }

  return await res.json();
};
