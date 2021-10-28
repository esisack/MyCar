import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Customer } from 'src/app/data/model/customer';
import { Item } from 'src/app/data/model/item';
import { CustomerService } from 'src/app/data/services/customer.service';
import { ItemService } from 'src/app/data/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name!: string;
  username!: string;

  cols = 4;

  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;

  items: Item[] = []

  customers: Customer[] = []

  constructor(
    private itemService: ItemService,
    private customerService: CustomerService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.itemService.getData().subscribe(data => {
      this.items = data
    }) 

    this.customerService.getData().subscribe(data => {
      this.customers = data
      console.log(data)
    })
  }

  goItem(id: number) {
    this.router.navigate(['/item', id])

  }


  getNextPage(event: PageEvent) {
    //  this.getProducts(event.pageIndex + 1, event.pageSize);
    }

}

