import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfogrphicsComponent } from './edit-infogrphics.component';

describe('EditInfogrphicsComponent', () => {
  let component: EditInfogrphicsComponent;
  let fixture: ComponentFixture<EditInfogrphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfogrphicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfogrphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
