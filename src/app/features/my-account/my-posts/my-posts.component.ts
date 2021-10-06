import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  name!: string;
  username!: string;

  cols = 4;

  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;

  products: number[] = []
  constructor() { }

  ngOnInit(): void {
    this.products.push(1)
    this.products.push(2)
    this.products.push(3)
    this.products.push(4)
  }

  getNextPage(event: PageEvent) {
    //  this.getProducts(event.pageIndex + 1, event.pageSize);
    }

}
