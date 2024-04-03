import { TestBed } from '@angular/core/testing';

import { DummyModelService } from './dummy-model.service';

describe('DummyModelService', () => {
  let service: DummyModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
