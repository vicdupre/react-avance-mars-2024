export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type Products = Product[];

export interface Post {
  _id: string;
  title: string;
  content: string;
}

export type Posts = Post[];
