import { TestBed } from '@angular/core/testing';

import { Generic } from './generic';

describe('Generic', () => {
  let service: Generic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Generic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
