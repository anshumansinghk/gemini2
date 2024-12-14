import { TestBed } from '@angular/core/testing';

import { ProgressserviceService } from './progressservice.service';

describe('ProgressserviceService', () => {
  let service: ProgressserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
