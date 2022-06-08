import { TestBed } from '@angular/core/testing';

import { FormsfireService } from './formsfire.service';

describe('FormsfireService', () => {
  let service: FormsfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
