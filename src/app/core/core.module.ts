import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './services/material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
