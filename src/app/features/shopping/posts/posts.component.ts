import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Item } from 'src/app/data/model/item';
import { ItemService } from 'src/app/data/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  name!: string;
  username!: string;

  imageUrl = environment.imgUrl;
  
  cols = 4;
  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;

  items: Item[] = []

  constructor(
    private itemService: ItemService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.itemService.getData().subscribe(data => {
      this.items = data
    }) 
  }

  goItem(id: number) {
    this.router.navigate(['/item', id])

  }

  getNextPage(event: PageEvent) {
    //  this.getProducts(event.pageIndex + 1, event.pageSize);
    }

}
