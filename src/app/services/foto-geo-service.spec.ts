import { TestBed } from '@angular/core/testing';

import { FotoGeoService } from './foto-geo-service';

describe('FotoGeoService', () => {
  let service: FotoGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
