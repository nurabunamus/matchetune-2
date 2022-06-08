import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilehealerComponent } from './profilehealer.component';

describe('ProfilehealerComponent', () => {
  let component: ProfilehealerComponent;
  let fixture: ComponentFixture<ProfilehealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilehealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilehealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
