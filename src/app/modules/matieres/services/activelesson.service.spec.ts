import { TestBed } from '@angular/core/testing';

import { ActivelessonService } from './activelesson.service';

describe('ActivelessonService', () => {
  let service: ActivelessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivelessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
