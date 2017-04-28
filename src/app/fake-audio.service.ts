// テストのために、外部に依存することはしないservice
import {
  Injectable
} from '@angular/core';
import * as global from './global';

@Injectable()
export class FakeAudioService {
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  filters: Array<any> ;
  constructor() {
    this.analyser = global.audioContext.createAnalyser();

    this.filters = [{
        name: 'lowshelf',
        value: this.createLowShelfFilter()
      },
      {
        name: 'highshelf',
        value: this.createHighShelfFilter()
      }
    ];

    navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(
        stream => {
          this.source = global.audioContext.createMediaStreamSource(stream);
          this.source.connect(this.analyser);
          this.analyser.connect(global.audioContext.destination);
        }
      );
  }

  getAnalyser(): AnalyserNode {
    return this.analyser
  }

  connectFilters(connectedFilters: Array<string>) {
    // なにもしない
  }

  disconnectAll() {
    // なにもしない
  }

  createLowShelfFilter(): BiquadFilterNode {
    let biquadForLow = global.audioContext.createBiquadFilter();
    biquadForLow.type = 'lowshelf';
    return biquadForLow;
  }

  createHighShelfFilter(): BiquadFilterNode {
    let biquadForHigh = global.audioContext.createBiquadFilter();
    biquadForHigh.type = 'highshelf';
    return biquadForHigh;
  }

}