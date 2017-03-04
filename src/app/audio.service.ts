import { Injectable, Inject } from '@angular/core';
import * as global from './global';

@Injectable()
export class AudioService {
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  filters: Array<any>;
  
  constructor() {
    this.analyser = global.audioContext.createAnalyser();

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

    this.setupPlainAudioGraph();
  }

  setupPlainAudioGraph() {
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

  getAnalyser() : AnalyserNode {
    return this.analyser
  }

  connectFilters(connectedFilters: Array<string>) {
    // 一度全ノードをばらす
    this.disconnectAll();

    // 繋ぐフィルタがないなら、アナライザだけ繋ぐ
    if (connectedFilters.length == 0) {
      this.source.connect(this.analyser);
      this.analyser.connect(global.audioContext.destination);
      return
    }

    // 繋ぐフィルタが１つのとき
    if (connectedFilters.length == 1) {
      let connectedNode: AudioNode = this.filters.find(obj => {
            return obj['name'] == connectedFilters[0];
      })['value'];

      this.source.connect(connectedNode);
      connectedNode.connect(this.analyser);
      this.analyser.connect(global.audioContext.destination)

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
        this.analyser.connect(global.audioContext.destination);
      }
      // それ以外(2つのフィルタの間にあるフィルタ)
      else {
        lastConnectedNode.connect(connectedNode);
      }

      lastConnectedNode = connectedNode;

    });
  }

  disconnectAll() {
    if(this.source) this.source.disconnect();
    this.analyser.disconnect();
    this.filters.forEach(obj => {
      let filter: AudioNode = obj['value'];
      filter.disconnect();
    });
  }

  createLowShelfFilter() : BiquadFilterNode {
    let biquadForLow = global.audioContext.createBiquadFilter();
    biquadForLow.type = 'lowshelf';
    biquadForLow.frequency.value = 400;
    biquadForLow.gain.value = 25;
    return biquadForLow;
  }

  createHighShelfFilter() : BiquadFilterNode {
    let biquadForHigh = global.audioContext.createBiquadFilter();
    biquadForHigh.type = 'highshelf';
    biquadForHigh.frequency.value = 750;
    biquadForHigh.gain.value = 25;
    return biquadForHigh;
  }

}

