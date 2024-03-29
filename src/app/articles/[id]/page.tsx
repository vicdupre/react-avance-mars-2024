type Props = Readonly<{
  params: {
    id: string;
  };
}>;

const Article = ({ params: { id } }: Props) => {
  return <p>Article {id}</p>;
};

export default Article;
