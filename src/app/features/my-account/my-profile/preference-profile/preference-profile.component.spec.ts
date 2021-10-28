import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceProfileComponent } from './preference-profile.component';

describe('PreferenceProfileComponent', () => {
  let component: PreferenceProfileComponent;
  let fixture: ComponentFixture<PreferenceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
