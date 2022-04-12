import { TestBed } from '@angular/core/testing';

import { CompetitorService } from './competitor.service';

describe('CompetitorService', () => {
  let service: CompetitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
