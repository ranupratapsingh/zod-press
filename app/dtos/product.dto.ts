import * as z from 'zod';

const $Product = z.object({
  title: z.string().min(10).max(100),
  price: z.number().min(1).max(10000),
  description: z.string().min(50).max(500),
  category: z.string().min(4).max(40),
  image: z.url(),
});

type Product = z.infer<typeof $Product>;

export type { Product };
export { $Product };
