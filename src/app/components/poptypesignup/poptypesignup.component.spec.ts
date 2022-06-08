import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoptypesignupComponent } from './poptypesignup.component';

describe('PoptypesignupComponent', () => {
  let component: PoptypesignupComponent;
  let fixture: ComponentFixture<PoptypesignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoptypesignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoptypesignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
