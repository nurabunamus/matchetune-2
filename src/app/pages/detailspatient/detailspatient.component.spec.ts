import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspatientComponent } from './detailspatient.component';

describe('DetailspatientComponent', () => {
  let component: DetailspatientComponent;
  let fixture: ComponentFixture<DetailspatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailspatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailspatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
