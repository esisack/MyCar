import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/services/material/material.module';
import { PostComponent } from './posts/post/post.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SidebarComponent } from './posts/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgxGalleryModule
  ]
})
export class ShoppingModule { }
