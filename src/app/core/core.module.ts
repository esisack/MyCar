import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './services/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';
import { CountDownComponent } from './components/count-down/count-down.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HelpComponent,
    CountDownComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    CountDownComponent
  ]
})
export class CoreModule { }
