import { TestBed } from '@angular/core/testing';

import { JournalserviceService } from './journalservice.service';

describe('JournalserviceService', () => {
  let service: JournalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
