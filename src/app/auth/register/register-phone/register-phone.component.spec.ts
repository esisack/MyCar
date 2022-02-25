import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPhoneComponent } from './register-phone.component';

describe('RegisterPhoneComponent', () => {
  let component: RegisterPhoneComponent;
  let fixture: ComponentFixture<RegisterPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
