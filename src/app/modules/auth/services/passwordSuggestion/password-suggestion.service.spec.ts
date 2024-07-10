import { TestBed } from '@angular/core/testing';

import { PasswordSuggestionService } from './password-suggestion.service';

describe('PasswordSuggestionService', () => {
  let service: PasswordSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
