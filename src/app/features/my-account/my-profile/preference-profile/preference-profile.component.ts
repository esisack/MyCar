import { Component, OnInit } from '@angular/core';



import {  ChangeDetectorRef } from '@angular/core';
import { Customer } from 'src/app/data/model/customer';
import { Preference } from 'src/app/data/model/preference';
import { CustomerService } from 'src/app/data/services/customer.service';
import { PreferenceService } from 'src/app/data/services/preference.service';

@Component({
  selector: 'app-preference-profile',
  templateUrl: './preference-profile.component.html',
  styleUrls: ['./preference-profile.component.scss']
})
export class PreferenceProfileComponent implements OnInit {

  customer!: Customer
  preference!: Preference
  preferenceAnterior!: Preference
  change: boolean = false
  prefer1: boolean = false
  prefer2: boolean = false
  prefer3: boolean = false
  prefer4: boolean = false
  prefer5: boolean = false
  prefer6: boolean = false

  constructor(
    private customerService: CustomerService,
    private preferenceService: PreferenceService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.customer = this.customerService.currentCustomer
    this.preferenceService.getData(this.customer.entityId).subscribe(data => {
      this.preference = data
      this.preferenceAnterior = data
      this.initPreferences(this.preference)

    })
  }

  initPreferences(prefer: Preference) {
    this.prefer1 = prefer.preference1 === 1
    this.prefer2 = prefer.preference2 === 1
    this.prefer3 = prefer.preference3 === 1
    this.prefer4 = prefer.preference4 === 1
    this.prefer5 = prefer.preference5 === 1
    this.prefer6 = prefer.preference6 === 1
  }

  onChange(e: any) {
    console.log("change")
    this.change = true
  }

  onSubmit() {
    this.preference.preference1 = this.prefer1 ? 1 : 0
    this.preference.preference2 = this.prefer2 ? 1 : 0
    this.preference.preference3 = this.prefer3 ? 1 : 0
    this.preference.preference4 = this.prefer4 ? 1 : 0
    this.preference.preference5 = this.prefer5 ? 1 : 0
    this.preference.preference6 = this.prefer6 ? 1 : 0
    this.preferenceService.update(this.preference).subscribe(data => {
      this.preference = data
      this.preferenceAnterior = data
      this.change = false
    })
  }

  onCancel() {
    this.initPreferences(this.preferenceAnterior) 
    this.change = false 
  }

}
