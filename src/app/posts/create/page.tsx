import { createPost } from "@/lib/postsActions";

const CreatePost = () => {
  return (
    <div>
      <h1>Créer un nouveau post</h1>
      <form action={createPost}>
        <label htmlFor="title">Titre</label>
        <input type="text" name="title" id="title" required />
        <label htmlFor="content">Contenu</label>
        <textarea name="content" id="title" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default CreatePost;
