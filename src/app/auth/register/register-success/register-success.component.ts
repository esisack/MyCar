import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {

  @Input() phone!: number;
  @Input() code!: number;
  @Input() mail!: string;
  @Input() option!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
