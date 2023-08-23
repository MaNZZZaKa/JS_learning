import { Component } from '@angular/core';
import { Product } from '../types/product';
import { ProductsService } from '../services/products.servive';
import { map, Observable } from 'rxjs';
import { sortProducts } from '../utilities/sort-products';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainPageComponent {
  readonly products$: Observable<Product[]> = this.productsService
    .getProducts()
    .pipe(map((products) => (!products ? [] : sortProducts(products))));

  constructor(private productsService: ProductsService) {}
}
