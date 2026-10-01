import { TestBed } from '@angular/core/testing';

import { Generic } from './generic';

describe('Generic', () => {
  let service: Generic<any>; //Generic<Object> can also be used, makes sure its an object

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Generic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
