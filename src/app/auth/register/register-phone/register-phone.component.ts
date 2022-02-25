import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Router } from '@angular/router';
import { SendSmsService } from 'src/app/core/services/send-sms.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'register-phone',
  templateUrl: './register-phone.component.html',
  styleUrls: ['./register-phone.component.scss']
})
export class RegisterPhoneComponent implements OnInit {
  submitStatus: boolean = false;
  phoneForm!: FormGroup 

  @Input() option!: string;
  @Input() code!: number;
  @Input() phone!: number;
  @Output() valueResponse: EventEmitter<string> = new EventEmitter()
  @Output() codeResponse: EventEmitter<number> = new EventEmitter()
  @Output() phoneResponse: EventEmitter<number> = new EventEmitter()

  countryArea: number = 54
  selected: string = '54';

  constructor(
    private formBuilder: FormBuilder,
    private sendService: SendSmsService,
    private router: Router) { }

  ngOnInit() {
    this.phoneForm = this.formBuilder.group({
      phone: [null, Validators.compose([Validators.pattern("^[0-9]*$")])]
    });
  }

  onSubmit() {
    this.code = this.genCode();
    if (this.code > 1000000) {
      this.code = this.code - 1000000
    }

    this.sendService.sendSMS(this.phoneForm.get('phone')?.value, this.code).subscribe(
      () => {
        this.option = "confirm"
        this.phoneResponse.emit(this.phoneForm.get('phone')?.value)
        this.codeResponse.emit(this.code)
        this.valueResponse.emit(this.option)
        this.submitStatus = true;
       },
      () => {
        this.sendService.activeSMS().subscribe(data => {
          this.sendService.sendSMS(this.phoneForm.get('phone')?.value, this.code).subscribe(
            () => { 
              this.option = "confirm"
              this.phoneResponse.emit(this.phoneForm.get('phone')?.value)
              this.codeResponse.emit(this.code)
              this.valueResponse.emit(this.option)
              this.submitStatus = true;
            })
        },
          (err1: any) => {
            console.log(err1)
          })
      })
  }

  genCode(): number {
    return Math.floor(Math.random() * 700000) + 124000
  }

  matcher = new MyErrorStateMatcher();

}
