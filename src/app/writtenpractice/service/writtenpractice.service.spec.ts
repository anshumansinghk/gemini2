import { TestBed } from '@angular/core/testing';

import { WrittenpracticeService } from './writtenpractice.service';

describe('WrittenpracticeService', () => {
  let service: WrittenpracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrittenpracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
