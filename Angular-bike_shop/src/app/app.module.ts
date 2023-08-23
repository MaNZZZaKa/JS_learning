import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContactPageComponent } from './contacts/contacts.component';
import { ProductsPageComponent } from './products/products.component';
import { SliceDescrPipe } from './pipes/slice-descr.pipe';
import { MainPageComponent } from './main/main.component';
import { DetailsPageComponent } from './details-page/details.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProductComponent,
    ContactPageComponent,
    DetailsPageComponent,
    ProductsPageComponent,
    NavigationComponent,
    SliceDescrPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
