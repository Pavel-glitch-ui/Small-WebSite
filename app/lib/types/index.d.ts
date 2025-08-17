export type User = {
  id: string;
  name: string;
  email: string;  
  emailVerified: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date; 
};
export type Post = {
    id: number;
    title: string;
    content: string | null;
    description: string | null;
    authorId: string;
    updatedAt: Date;
    createdAt: Date;
};

export type Res<T> = {
  status: {
    ok: boolean;
  };
  error?: typeof Error | string;
  data?: T;
}