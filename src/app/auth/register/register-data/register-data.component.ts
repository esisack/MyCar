import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SendSmsService } from 'src/app/core/services/send-sms.service';
import { AuthService } from '../../servives/auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {
  submitStatus: boolean = false;
  registerForm!: FormGroup;
  @Input() signupType!: number;
  @Input() phone!: number;
  @Input() code!: number;
  @Input() mail!: string;
  @Input() option!: string;
  @Output() valueResponse: EventEmitter<string> = new EventEmitter()
  @Output() codeResponse: EventEmitter<number> = new EventEmitter()
  @Output() mailResponse: EventEmitter<string> = new EventEmitter()

  firstNameLabel!: string;
  lastNameLabel!: string;
  docNameLabel!: string;
  firstNameHint!: string;
  lastNameHint!: string;
  firstNameError!: string;
  lastNameError!: string;

   constructor(
    private sendService: SendSmsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.onChangeType()
    this.initFormValidators()
    this.setPhoneValidation()
  }

  initFormValidators() {
    let dt = 'DNI'
    if (this.signupType == 1) {
      dt = 'CUIT'
    }
    
    let _phone = this.phone
    this.registerForm = this.formBuilder.group({
      nombre: [, { validators: [Validators.required,  Validators.pattern('^[a-zA-Z]+$')], updateOn: "change" }],
      apellido: [, { validators: [Validators.required,  Validators.pattern('^[a-zA-Z]+$')], updateOn: "change" }],
      docType: [dt, { validators: [Validators.required], updateOn: "change" }],
      documento: [, { validators: [Validators.required], updateOn: "change" }],
      celular: [_phone, { updateOn: "change" }],
      mail: [, {
        validators: [Validators.required, Validators.email],
        updateOn: "change",
      }],
      clave: [, { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(12)], updateOn: "change" }],
    });
  }

  setPhoneValidation() {
    const phoneControl = this.registerForm.get("celular");
    //phoneControl.setValidators([Validators.pattern("^[0-9]*$"), Validators.required ]);
  }

  onChangeType() {
    console.log(this.signupType)
    if (this.signupType == 0) {
      this.firstNameLabel = 'Nombre'
      this.lastNameLabel = 'Apellido'
      this.docNameLabel = 'Documento'
      this.firstNameHint = 'Ingresá tal como figura en tú documento!!'
      this.lastNameHint = 'Ingresá tal como figura en tú documento!!'
      this.firstNameError = 'El campo Nombre es'
      this.lastNameError = 'El campo Apellido es'
    } else {
      this.firstNameLabel = 'Nombre de fantasia'
      this.lastNameLabel = 'Razón Social'
      this.docNameLabel = 'CUIT No'
      this.firstNameHint = 'Ingrese tal como lo conocen sus clientes!!'
      this.lastNameHint = 'Ingrese tal como figura en AFIP!!'
      this.firstNameError = 'El campo Nombre de fantasia es'
      this.lastNameError = 'El campo Razón Social es'
    }
  }

  onSubmit() {
    var userDto = {}
    // this.userDto.apellido = this.registerForm.get("apellido")?.value
    // this.userDto.nombre = this.registerForm.get("nombre")?.value
    // this.userDto.documento = this.registerForm.get("documento")?.value
    // this.userDto.celular = this.registerForm.get("celular")?.value
    // this.userDto.mail = this.registerForm.get("mail")?.value
    // this.userDto.clave = this.registerForm.get("clave")?.value
    // this.userDto.tipoEntidad = this.signupType + 1

    this.authService.validateMail(this.registerForm.get("mail")?.value, null).subscribe((dto: { valid: any; }) => {
      console.log(dto)
      if (dto.valid) {
        console.log("mail registrado")
        this.router.navigate(['/login'])

      } else {
        console.log("entro por else")
        this.authService.register(userDto).subscribe(
          () => {
            this.code = this.genCode();
            this.sendService.sendMail(this.registerForm.get("mail")?.value, this.code).subscribe(() => {
              this.option = "confirm"
              this.mailResponse.emit(this.registerForm.get('mail')?.value)
              this.codeResponse.emit(this.code)
              this.valueResponse.emit(this.option)
              this.submitStatus = true;
            })
          },
          () => {

          }
        )
      }
    })

  }

  genCode(): number {
    return Math.floor(Math.random() * 999999) + 124000
  }

  matcher = new MyErrorStateMatcher();
}
