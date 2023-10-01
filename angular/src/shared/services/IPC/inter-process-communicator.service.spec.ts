import { TestBed } from '@angular/core/testing';

import { InterProcessCommunicatorService } from './inter-process-communicator.service';

describe('InterProcessCommunicatorService', () => {
  let service: InterProcessCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterProcessCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
