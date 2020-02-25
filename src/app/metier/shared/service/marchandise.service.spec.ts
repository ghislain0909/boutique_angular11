import { TestBed } from '@angular/core/testing';

import { MarchandiseService } from './marchandise.service';

describe('MarchandiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarchandiseService = TestBed.get(MarchandiseService);
    expect(service).toBeTruthy();
  });
});
