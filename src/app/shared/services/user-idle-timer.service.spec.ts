import { TestBed } from '@angular/core/testing';

import { UserIdleTimerService } from './user-idle-timer.service';

describe('UserIdelTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdleTimerService = TestBed.get(UserIdleTimerService);
    expect(service).toBeTruthy();
  });
});
