import { TestBed } from '@angular/core/testing';

import { NotficationServiceService } from './notfication-service.service';

describe('NotficationServiceService', () => {
  let service: NotficationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotficationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
