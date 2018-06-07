import { TestBed, inject } from '@angular/core/testing';

import { SucursService } from './sucurs.service';

describe('SucursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SucursService]
    });
  });

  it('should be created', inject([SucursService], (service: SucursService) => {
    expect(service).toBeTruthy();
  }));
});
