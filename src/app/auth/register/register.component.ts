import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupType: number = 0
  option: string = 'phone'
  code!: number; 
  phone!: number;
  mail!: string; 

  constructor(private location: Location) { }

  ngOnInit() {

  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.signupType = tabChangeEvent.index

  }

  goBack() {
    this.location.back()
  }

}
