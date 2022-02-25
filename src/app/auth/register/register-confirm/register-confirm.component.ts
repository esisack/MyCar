import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {
  submitStatus: boolean = false;
  confirmForm!: FormGroup;
  isCheckFailed: boolean = false
  @Input() option!: string;
  @Input() code!: number;
  @Input() phone!: number;
  @Input() mail!: string 
  @Output() valueResponse: EventEmitter<string> = new EventEmitter()

  enterCode!: number;
  isMail: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initFormValidators()
    if (this.mail != null) {
      this.isMail = true
    }
    
  }

  initFormValidators() {
    this.confirmForm = this.formBuilder.group({
      enterCode: [, Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")])]
    })
  }

  onSubmit() {
    if (this.code == this.confirmForm.get('enterCode')?.value) {
      if (this.mail != null) {
        this.option = "success"
        this.valueResponse.emit(this.option)
      } else {
        this.option = 'data'
        this.valueResponse.emit(this.option)
        this.isCheckFailed = false
      }
    } else {
      this.confirmForm.get('enterCode')?.setValue(null)
      this.isCheckFailed = true
    }
  }

  matcher = new MyErrorStateMatcher();

}