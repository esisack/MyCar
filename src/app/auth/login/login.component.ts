import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/data/services/customer.service';
import { UserService } from 'src/app/data/services/user.service';
import { AuthService } from '../servives/auth.service';
import { TokenStorageService } from '../servives/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: "change",
      }],
      password: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)], updateOn: "change" }],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles

    }
  }

  async onSubmit(): Promise<void> {

    var username = this.loginForm.get("username")?.value
  //var password = this.loginForm.get("password").value


    await this.authService.login(this.loginForm.value).toPromise().then(
      data => {
        
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(username);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;

        this.getEntidad(username)

        // this.reloadPage();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }

  getEntidad(mail: string) {
    this.userService.getDataByMail(mail).subscribe(data => {
      this.customerService.getDataById(data.entityId).subscribe(data => {
        this.customerService.currentCustomer = data
      })
      this.userService.mail = data.mail
      this.userService.phone = data.phone
      this.router.navigate(['/'])
    })
  }
}
