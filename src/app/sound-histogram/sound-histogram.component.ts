import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sound-histogram',
  templateUrl: './sound-histogram.component.html',
  styleUrls: ['./sound-histogram.component.css']
})

export class SoundHistogramComponent implements AfterViewInit {
  private canvasCtx: CanvasRenderingContext2D;
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private requestID: number;
  private bufferLength: number;
  private dataArray: Uint8Array;

  @ViewChild("histogram") histCanvas;

  constructor() {
    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  // Canvas(#wave)が初期化されたあとに実行される
  ngAfterViewInit() {
    this.canvasCtx = this.histCanvas.nativeElement.getContext("2d");
    
    const width = this.canvasCtx.canvas.width;
    const height = this.canvasCtx.canvas.height;
    this.canvasCtx.clearRect(0, 0, width, height);
    navigator.mediaDevices.getUserMedia({
      audio: true
    })
    .then(
      stream => { 
        let source = this.audioCtx.createMediaStreamSource(stream);
        source.connect(this.analyser);
        this.draw();
      }
    );
  }

  draw() {
    const width = this.canvasCtx.canvas.width;
    const height = this.canvasCtx.canvas.height;
    if(this.canvasCtx) {
      this.requestID = requestAnimationFrame(this.draw.bind(this)); // 再帰的に描画する
      this.analyser.getByteFrequencyData(this.dataArray);

      this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      this.canvasCtx.fillRect(0, 0, width, height);

      let barWidth = (width / this.bufferLength) * 2.5;
      let barHeight: number;
      let x = 0;

      for(let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];

        this.canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ', 50, 50)';
        this.canvasCtx.fillRect(x, height - barHeight/2, barWidth, barHeight/2);

        x += barWidth + 1;
      }
    }
  }
}
