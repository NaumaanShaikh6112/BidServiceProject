import { TestBed } from '@angular/core/testing';

import { BidVirsionService } from './bid-virsion.service';

describe('BidVirsionService', () => {
  let service: BidVirsionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidVirsionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
