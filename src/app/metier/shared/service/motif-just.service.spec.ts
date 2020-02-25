import { TestBed } from '@angular/core/testing';

import { MotifJustService } from './motif-just.service';

describe('MotifJustService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotifJustService = TestBed.get(MotifJustService);
    expect(service).toBeTruthy();
  });
});
