import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Router } from '@angular/router';
import { Address } from 'src/app/data/model/address';
import { Customer } from 'src/app/data/model/customer';
import { Zip } from 'src/app/data/model/zip';
import { AddressService } from 'src/app/data/services/address.service';
import { CustomerService } from 'src/app/data/services/customer.service';
import { ZipService } from 'src/app/data/services/zip.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {

  @Input() option!: string;
  @Input() address!: Address
  @Output() valueResponse: EventEmitter<String> = new EventEmitter()
  @Output() domicilioResponse: EventEmitter<Address> = new EventEmitter()

  submitStatus: boolean = false;
  addressForm!: FormGroup;
  customer!: Customer
  zips!: Zip[];
  value: number = 4400
  create: boolean = true

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private zipService: ZipService,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.customer = this.customerService.currentCustomer
    // this.codPosservive.getData().subscribe(data => {
    //   console.log(data)
    //   this.codigosPostales = data
    // })
    this.initFormValidators()
  }

  initFormValidators() {
    this.addressForm = this.formBuilder.group({
      domicilioId: [, { updateOn: "change" }],
      tipoDomicilio: [, { updateOn: "change" }],
      calle: [, { validators: [Validators.required], updateOn: "change" }],
      altura: [, { validators: [Validators.required], updateOn: "change" }],
      piso: [, { updateOn: "change" }],
      referencia: [, { updateOn: "change" }],
      barrio: [, { validators: [Validators.required], updateOn: "change" }],
      localidad: [, { validators: [Validators.required], updateOn: "change" }],
      provincia: [, { validators: [Validators.required], updateOn: "change" }],
      telefono: [, { validators: [ Validators.pattern("^[0-9]*$")], updateOn: "change" }],
      codpos: [, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: "change" }]
    });
    if (this.address != null) {
      this.create = false

      this.addressForm.get('domicilioId')?.setValue(this.address.addressId)
      this.addressForm.get('tipoDomicilio')?.setValue(this.address.addressType)
      this.addressForm.get('calle')?.setValue(this.address.street)
      this.addressForm.get('altura')?.setValue(this.address.streetNumber)
      this.addressForm.get('piso')?.setValue(this.address.apartment)
      this.addressForm.get('barrio')?.setValue(this.address)
      this.addressForm.get('referencia')?.setValue(this.address.reference)
      this.addressForm.get('localidad')?.setValue(this.address.zipId)
      // this.addressForm.get('provincia').setValue(this.domicilio.codigoPostal.provincia)
      // this.addressForm.get('telefono').setValue(this.domicilio.telefono)
      // this.addressForm.get('codpos').setValue(this.domicilio.codigoPostal.codpos)
    }
  }

  onSubmit() {
    if (this.create) {
      // this.domService.create(dom).subscribe(data => {
      //   console.log(data)
      //   this.changeOption('profile')
      // })
    } else {
      // this.domService.update(dom).subscribe(data => {
      //   console.log(data)
      //   this.changeOption('profile')
      // })
    }
  }

  onSelectCP(e:any) {
    this.value = Number(e.target.value)
    console.log(this.value)
    // let cp = this.codigosPostales.find(cp => cp.codpos === this.value)
    // console.log(cp)
    // this.addressForm.get('localidad').setValue(cp.localidad)
    // this.addressForm.get('provincia').setValue(cp.provincia)
  }

  changeOption(value: string) {
    this.option = value
    this.valueResponse.emit(this.option)
  }

  changeAddress(address: Address) {
    this.domicilioResponse.emit(address);
    this.changeOption('address')
  }

  matcher = new MyErrorStateMatcher();

}

