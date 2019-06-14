import { TestBed } from '@angular/core/testing';

import { SharingDateService } from './sharing-date.service';

describe('SharingDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharingDateService = TestBed.get(SharingDateService);
    expect(service).toBeTruthy();
  });
});
