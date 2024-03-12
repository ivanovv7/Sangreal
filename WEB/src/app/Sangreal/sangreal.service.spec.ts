import { TestBed } from '@angular/core/testing';

import { SangrealService } from './sangreal.service';

describe('SangrealService', () => {
  let service: SangrealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SangrealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
