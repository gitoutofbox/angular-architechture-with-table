import { TestBed } from '@angular/core/testing';

import { ChartServiceService } from './chart-service.service';

describe('ChartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartServiceService = TestBed.get(ChartServiceService);
    expect(service).toBeTruthy();
  });
});
