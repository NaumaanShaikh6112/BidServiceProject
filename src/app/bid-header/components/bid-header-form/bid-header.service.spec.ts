import { TestBed } from '@angular/core/testing';

import { BidHeaderService } from '../../services/bid-header.service';

describe('BidHeaderService', () => {
  let service: BidHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
