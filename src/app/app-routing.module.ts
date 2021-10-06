import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPostsComponent } from './features/my-account/my-posts/my-posts.component';
import { HomeComponent } from './features/shopping/home/home.component';
import { PostComponent } from './features/shopping/posts/post/post.component';
import { PostsComponent } from './features/shopping/posts/posts.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,

  },
  {
    path: 'items', component: PostsComponent,
  },
  {
    path: 'publicaciones', component: MyPostsComponent,

  },
  {
    path: 'item/:id', component: PostComponent,

  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
