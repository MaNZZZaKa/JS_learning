import { Component } from '@angular/core';
import { products as data } from 'src/data/bibka-products';
import { IProduct } from 'src/types/bibka-products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manz-test';

  products: IProduct[] = data
}
