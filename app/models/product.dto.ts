// this file is named dto since it is not a DB model

// the Product model definition
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type { Product };
