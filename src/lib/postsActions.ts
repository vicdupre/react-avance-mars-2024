"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Post, Posts } from "./types";
import { z } from "zod";
import { unstable_noStore as noStore } from "next/cache";

const PostSchema = z.object({
  _id: z.string(),
  title: z.string().min(2, "Title too short"),
  content: z.string().min(10, "Content too short"),
});

const NewPost = PostSchema.omit({ _id: true });

export const createPost = async (prevData: any, formData: FormData) => {
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
    if (error instanceof z.ZodError) {
      return {
        errors: error.errors.map((e) => e.message),
        errorCount: prevData.errorCount + 1,
      };
    }

    return {
      errors: ["Une erreur est survenue"],
      errorCount: prevData.errorCount + 1,
    };
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

export const getPost = async (id: string): Promise<Post> => {
  noStore();
  const res = await fetch(
    "https://crudcrud.com/api/1790f08c0db54c68b170d69cc0a10bb9/posts/" + id
  );
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }
  return await res.json();
};

export const updatePost = async (
  id: string,
  prevData: any,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  try {
    const verifiedData = NewPost.parse(data);
    console.log(verifiedData);
    const res = await fetch(
      "https://crudcrud.com/api/1790f08c0db54c68b170d69cc0a10bb9/posts/" + id,
      {
        method: "PUT",
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
    if (error instanceof z.ZodError) {
      return {
        errors: error.errors.map((e) => e.message),
        errorCount: prevData.errorCount + 1,
      };
    }

    return {
      errors: ["Une erreur est survenue"],
      errorCount: prevData.errorCount + 1,
    };
  }

  revalidatePath("/posts");
  redirect("/posts");
};
