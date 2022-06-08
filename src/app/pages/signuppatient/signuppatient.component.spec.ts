import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuppatientComponent } from './signuppatient.component';

describe('SignuppatientComponent', () => {
  let component: SignuppatientComponent;
  let fixture: ComponentFixture<SignuppatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuppatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuppatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
