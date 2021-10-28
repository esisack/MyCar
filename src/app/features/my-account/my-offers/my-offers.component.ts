import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Item } from 'src/app/data/model/item';
import { ItemService } from 'src/app/data/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
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
    this.router.navigate(['/publicacion', id])

  }

  getNextPage(event: PageEvent) {
    //  this.getProducts(event.pageIndex + 1, event.pageSize);
    }
}
