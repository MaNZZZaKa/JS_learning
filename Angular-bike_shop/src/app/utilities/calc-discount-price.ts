export function calcDiscountPrice(price: number, discount: number): number {
  return (100 - discount) * 0.01 * price;
}
