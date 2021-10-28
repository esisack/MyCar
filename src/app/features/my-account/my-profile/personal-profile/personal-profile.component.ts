import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Address } from 'src/app/data/model/address';
import { Customer } from 'src/app/data/model/customer';
import { AddressService } from 'src/app/data/services/address.service';
import { CustomerService } from 'src/app/data/services/customer.service';
import { UserService } from 'src/app/data/services/user.service';



@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {
  @Input() option!: string
  @Output() valueResponse: EventEmitter<String> = new EventEmitter()
  @Output() domicilioResponse: EventEmitter<Address> = new EventEmitter()

  id!: number;
  customer!: Customer;
  address!: Address[];
  username!: string;
  mail!: string;
  phone!: number;

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private addressService: AddressService,
    private token: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.customer = this.customerService.currentCustomer
    this.mail = this.userService.mail
    this.phone = this.userService.phone
    // this.addressService.getAddressByCustomer(this.customer.entityId).subscribe(data => {
    //   this.domicilios = data
    // })
    this.username = this.token.getUser()
    this.mail = this.token.getUser()

  }

  changeOption(address: Address) {
    this.option = 'address'
    this.domicilioResponse.emit(address);
    this.valueResponse.emit(this.option)
  }

}
