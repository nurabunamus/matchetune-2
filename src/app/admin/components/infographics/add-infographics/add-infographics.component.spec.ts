import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfographicsComponent } from './add-infographics.component';

describe('AddInfographicsComponent', () => {
  let component: AddInfographicsComponent;
  let fixture: ComponentFixture<AddInfographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInfographicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
