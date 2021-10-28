import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Address } from 'src/app/data/model/address';
import { Customer } from 'src/app/data/model/customer';
import { CustomerService } from 'src/app/data/services/customer.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  option: string = 'profile'
  jobOption: string = 'profile'
  id!: number;
  customer!: Customer;
  addresses!: Address[];
  username!: string;
  mail!: string;

  constructor(
    private customerService: CustomerService,
    private token: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.customer = this.customerService.currentCustomer
    this.username = this.token.getUser()
    this.mail = this.token.getUser()

  }

  changeOption(option: string) {
    this.option = option
  }
}