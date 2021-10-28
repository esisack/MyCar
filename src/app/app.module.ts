import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { DefaultModule } from './default/default.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { registerLocaleData } from '@angular/common';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    NgxMaskModule.forRoot(maskConfig),
    DefaultModule,
    CoreModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
function es(es: any) {
  throw new Error('Function not implemented.');
}

