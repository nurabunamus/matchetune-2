import { TestBed } from '@angular/core/testing';

import { TabsadminService } from './tabsadmin.service';

describe('TabsadminService', () => {
  let service: TabsadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
