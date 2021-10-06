import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostComponent } from './my-post/my-post.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/services/material/material.module';
import { MyPostsComponent } from './my-posts/my-posts.component';

@NgModule({
  declarations: [
    MyPostComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ]
})
export class MyAccountModule { }
