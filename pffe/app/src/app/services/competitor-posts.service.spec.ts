import { TestBed } from '@angular/core/testing';

import { CompetitorPostsService } from './competitor-posts.service';

describe('CompetitorPostsService', () => {
  let service: CompetitorPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitorPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
