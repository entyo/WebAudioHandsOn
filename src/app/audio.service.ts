import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AudioService {
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  filters: Array<any>;
  
  constructor(@Inject('audioContext') private audioCtx: AudioContext) {
    this.analyser = this.audioCtx.createAnalyser();

    this.filters = [
      {
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
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }
    );
  }

  getAnalyser() : AnalyserNode {
    return this.analyser
  }

  connectFilters(connectedFilters: Array<string>) {
    // 一度全ノードをばらす
    this.disconnectAll();

    // 繋ぐフィルタがないなら、アナライザだけ繋ぐ
    if (connectedFilters.length == 0) {
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      return
    }

    // 繋ぐフィルタが１つのとき
    if (connectedFilters.length == 1) {
      let connectedNode: AudioNode = this.filters.find(obj => {
            return obj['name'] == connectedFilters[0];
      })['value'];

      this.source.connect(connectedNode);
      connectedNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination)

      return 
    }
    
    // 繋ぐフィルタが複数のとき
    let lastConnectedNode: AudioNode;
    connectedFilters.forEach((connectedFilter, i) => {

      let connectedNode: AudioNode = this.filters.find(obj => {
            return obj['name'] == connectedFilters[i];
      })['value'];

      // 最初のフィルタ
      if (i == 0) {
        this.source.connect(connectedNode);
      }
      // 最後のフィルタ
      else if (i == connectedFilters.length - 1) {
        lastConnectedNode.connect(connectedNode);
        connectedNode.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }
      // それ以外(2つのフィルタの間にあるフィルタ)
      else {
        lastConnectedNode.connect(connectedNode);
      }

      lastConnectedNode = connectedNode;

    });
  }

  disconnectAll() {
    this.source.disconnect();
    this.analyser.disconnect();
    this.filters.forEach(obj => {
      let filter: AudioNode = obj['value'];
      filter.disconnect();
    });
  }

  createLowShelfFilter() : BiquadFilterNode {
    let biquadForLow = this.audioCtx.createBiquadFilter();
    biquadForLow.type = 'lowshelf';
    biquadForLow.frequency.value = 1000;
    biquadForLow.gain.value = 25;
    return biquadForLow;
  }

  createHighShelfFilter() : BiquadFilterNode {
    let biquadForHigh = this.audioCtx.createBiquadFilter();
    biquadForHigh.type = 'highshelf';
    biquadForHigh.frequency.value = 1000;
    biquadForHigh.gain.value = 25;
    return biquadForHigh;
  }

}

