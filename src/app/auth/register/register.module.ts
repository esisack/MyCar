import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { RegisterDataComponent } from './register-data/register-data.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterPhoneComponent } from './register-phone/register-phone.component';
import { RegisterComponent } from './register.component';
import { MaterialModule } from 'src/app/core/services/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterConfirmComponent,
    RegisterDataComponent,
    RegisterSuccessComponent,
    RegisterPhoneComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    CoreModule
  ]
})
export class RegisterModule { }
