import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { RecoveryComponent } from './recovery/recovery.component';
import { MaterialModule } from '../core/services/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    RegisterModule,
    CommonModule
  ]
})
export class AuthModule { }
