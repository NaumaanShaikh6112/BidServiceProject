import { TestBed } from '@angular/core/testing';

import { BidVersionService } from './bid-version.service';

describe('BidVirsionService', () => {
  let service: BidVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
