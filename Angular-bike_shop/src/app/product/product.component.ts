import { Component, Input } from '@angular/core';
import { Product } from 'src/app/types/product';
import { calcDiscountPrice } from '../utilities/calc-discount-price';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product;

  calcDiscountPrice(price: number, discount: number): number {
    return calcDiscountPrice(price, discount);
  }

  details: boolean = false;
}
