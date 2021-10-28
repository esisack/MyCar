import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/services/material/material.module';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostComponent } from './my-posts/my-post/my-post.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyOfferComponent } from './my-offers/my-offer/my-offer.component';
import { PersonalProfileComponent } from './my-profile/personal-profile/personal-profile.component';
import { AddressComponent } from './my-profile/address/address.component';
import { PreferenceProfileComponent } from './my-profile/preference-profile/preference-profile.component';
import { SecurityProfileComponent } from './my-profile/security-profile/security-profile.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    MyPostsComponent,
    MyPostComponent,
    MyProfileComponent,
    MyFavoritesComponent,
    MyOffersComponent,
    MyQuestionsComponent,
    MyOfferComponent,
    PersonalProfileComponent,
    AddressComponent,
    PreferenceProfileComponent,
    SecurityProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgxGalleryModule,
    NgxMaskModule
  ]
})
export class MyAccountModule { }
