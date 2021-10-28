import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/services/material/material.module';
import { MyAccountModule } from './my-account/my-account.module';
import { ShoppingModule } from './shopping/shopping.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    MyAccountModule,
    ShoppingModule

  ]
})
export class FeaturesModule { }
