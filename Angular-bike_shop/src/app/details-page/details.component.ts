import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.servive';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { calcDiscountPrice } from '../utilities/calc-discount-price';

@Component({
  selector: 'app-details-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  product: Product[];
  subscriprion: Subscription;
  sizes = new FormControl('');
  sizesList: string[] = ['XS', 'S', 'L', 'XL', 'XXL'];
  colors = new FormControl('');
  colorsList: string[] = ['blue', 'green', 'orange', 'grey', 'black'];

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('productId'));
    this.subscriprion = this.productsService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  ngOnDestroy(): void {
    this.subscriprion.unsubscribe();
  }

  calcDiscountPrice(price: number, discount: number): number {
    return calcDiscountPrice(price, discount);
  }
}
