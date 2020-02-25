import { TestBed } from '@angular/core/testing';

import { JustificatifService } from './justificatif.service';

describe('JustificatifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JustificatifService = TestBed.get(JustificatifService);
    expect(service).toBeTruthy();
  });
});
