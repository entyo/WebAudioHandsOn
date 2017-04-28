import { Injectable, Inject } from '@angular/core';
import * as global from './global';

@Injectable()
export class AudioService {
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  filters: Array < any > ;

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

    this.setupPlainAudioGraph();
  }

  setupPlainAudioGraph() {
    navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(stream => {
        this.source = global.audioContext.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
        this.analyser.connect(global.audioContext.destination);
      })
      .catch(e => {
      });
  }

  getAnalyser(): AnalyserNode {
    return this.analyser
  }

  connectFilters(connectedFilters: Array < string > ): Promise<any> {
    // 一度全ノードをばらす
    return new Promise( (resolve, rejected) => {
      this.disconnectAll()
          .then(() => {
            // 繋ぐフィルタがないなら、アナライザだけ繋ぐ
            if (connectedFilters.length == 0) {
              this.source.connect(this.analyser);
              this.analyser.connect(global.audioContext.destination);
              resolve();
            }
    
            let lastConnectedNode: AudioNode;
            connectedFilters.forEach((connectedFilter, i) => {
    
              // 名前に対応したFilterを取得
              let connectedNode: AudioNode = this.filters.find(obj => {
                return obj['name'] == connectedFilters[i];
              })['value'];
    
              // 最初のフィルタ
              if (i == 0) {
                this.source.connect(connectedNode);
              } else {
                lastConnectedNode.connect(connectedNode);
              }
              // 最後のフィルタ
              if (i == connectedFilters.length - 1) {
                connectedNode.connect(this.analyser);
                this.analyser.connect(global.audioContext.destination);
              }
    
              lastConnectedNode = connectedNode;
    
            });
  
            resolve();
          })
          .catch(e => {
            new Error(e);
          });
    });
  }

  disconnectAll(): Promise < any > {
    return new Promise((resolve, reject) => {
      if (this.source) {
        this.source.disconnect();
      }
      this.analyser.disconnect();
      this.filters.forEach(obj => {
        let filter: AudioNode = obj['value'];
        filter.disconnect();
      });
      resolve();
    });
  };

  createLowShelfFilter(): BiquadFilterNode {
    let biquadForLow = global.audioContext.createBiquadFilter();
    biquadForLow.type = 'lowshelf';
    biquadForLow.frequency.value = 400;
    biquadForLow.gain.value = 25;
    return biquadForLow;
  }

  createHighShelfFilter(): BiquadFilterNode {
    let biquadForHigh = global.audioContext.createBiquadFilter();
    biquadForHigh.type = 'highshelf';
    biquadForHigh.frequency.value = 750;
    biquadForHigh.gain.value = 25;
    return biquadForHigh;
  }

}