import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuphealerComponent } from './signuphealer.component';

describe('SignuphealerComponent', () => {
  let component: SignuphealerComponent;
  let fixture: ComponentFixture<SignuphealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuphealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuphealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
