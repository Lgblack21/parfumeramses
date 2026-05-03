export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
