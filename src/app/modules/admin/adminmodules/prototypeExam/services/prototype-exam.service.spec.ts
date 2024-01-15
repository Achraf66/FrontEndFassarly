import { TestBed } from '@angular/core/testing';

import { PrototypeExamService } from './prototype-exam.service';

describe('PrototypeExamService', () => {
  let service: PrototypeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrototypeExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
