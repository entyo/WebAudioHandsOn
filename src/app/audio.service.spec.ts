/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let ctx = new (window['AudioContext'] || window['webkitAudioContext'])();
  console.log(ctx);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
          providers: "audioContext",
          useValue: new (window['AudioContext'] || window['webkitAudioContext'])()
        },
        AudioService
      ]
    });
  });

  it('should ...', inject([AudioService], (service: AudioService) => {
    expect(service).toBeTruthy();
  }));
});
