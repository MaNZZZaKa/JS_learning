import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable, of } from 'rxjs';
import { products } from 'src/assets/data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(id: number): Observable<Product[]> {
    return of(products.filter((product) => product.id === id));
  }
}
