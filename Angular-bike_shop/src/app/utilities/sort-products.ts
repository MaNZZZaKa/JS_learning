import { Product } from '../types/product';

export function sortProducts(products: Product[]): Product[] {
  return products.sort((a, b) => b.discount - a.discount);
}
