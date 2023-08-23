import { Component } from '@angular/core';
import { Product } from 'src/app/types/product';
import { ProductsService } from '../services/products.servive';
import { map, Observable } from 'rxjs';
import { sortProducts } from '../utilities/sort-products';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsPageComponent {
  readonly products$: Observable<Product[]> = this.productsService
    .getProducts()
    .pipe(map((products) => (!products ? [] : sortProducts(products))));
  constructor(private productsService: ProductsService) {}
}
