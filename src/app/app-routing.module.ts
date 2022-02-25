import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { RegisterComponent } from './auth/register/register.component';
import { HelpComponent } from './core/components/help/help.component';
import { DefaultComponent } from './default/default.component';
import { MyFavoritesComponent } from './features/my-account/my-favorites/my-favorites.component';
import { MyOfferComponent } from './features/my-account/my-offers/my-offer/my-offer.component';
import { MyOffersComponent } from './features/my-account/my-offers/my-offers.component';

import { MyPostComponent } from './features/my-account/my-posts/my-post/my-post.component';
import { MyPostsComponent } from './features/my-account/my-posts/my-posts.component';
import { MyProfileComponent } from './features/my-account/my-profile/my-profile.component';
import { MyQuestionsComponent } from './features/my-account/my-questions/my-questions.component';
import { HomeComponent } from './features/shopping/home/home.component';
import { PostComponent } from './features/shopping/posts/post/post.component';
import { PostsComponent } from './features/shopping/posts/posts.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'items', component: PostsComponent,
      },
      {
        path: 'item/:id', component: PostComponent,

      },
      {
        path: 'publicaciones', component: MyPostsComponent,
      },
      {
        path: 'publicacion/:id', component: MyPostComponent,

      },
      {
        path: 'consultas', component: MyQuestionsComponent,
      },
      {
        path: 'favoritos', component: MyFavoritesComponent,

      },
      {
        path: 'mis-ofertas', component: MyOffersComponent,
      },
      {
        path: 'mi-oferta/:id', component: MyOfferComponent,

      },
      {
        path: 'mi-perfil', component: MyProfileComponent,
      },
      {
        path: 'ayuda', component: HelpComponent,
      }
    ]

  },{
    path: 'login', component: LoginComponent
  },{
    path: 'registrarse', component: RegisterComponent
  },{
    path: 'recuperar', component: RecoveryComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
