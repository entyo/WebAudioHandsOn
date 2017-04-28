import { TestBed, async, inject } from '@angular/core/testing';
import { FakeAudioService } from './fake-audio.service';

describe('FakeAudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeAudioService]
    });
  });

  it('should ...', inject([FakeAudioService], (service: FakeAudioService) => {
    expect(service).toBeTruthy();
  }));
});
