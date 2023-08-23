import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './products/products.component';
import { ContactPageComponent } from './contacts/contacts.component';
import { MainPageComponent } from './main/main.component';
import { DetailsPageComponent } from './details-page/details.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'contacts', component: ContactPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'product/:productId', component: DetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
