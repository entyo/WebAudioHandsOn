import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sound-wave',
  templateUrl: './sound-wave.component.html',
  styleUrls: ['./sound-wave.component.css']
})

export class SoundWaveComponent implements AfterViewInit {
  private canvasCtx: CanvasRenderingContext2D;
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private requestID: number;

  @ViewChild("wave") waveCanvas;

  constructor() {
    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
  }

  // Canvas(#wave)が初期化されたあとに実行される
  ngAfterViewInit() {
    let waveCanvas: HTMLCanvasElement;
    waveCanvas = this.waveCanvas.nativeElement;
    this.canvasCtx = waveCanvas.getContext("2d");
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
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
    const canvasWidth = this.canvasCtx.canvas.width;
    const canvasHeight = this.canvasCtx.canvas.height;
    if(this.canvasCtx) {
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
    
      this.analyser.getByteTimeDomainData(dataArray);
      this.requestID = requestAnimationFrame(this.draw.bind(this)); // 再帰的に描画する

      this.canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      this.canvasCtx.beginPath();
    
      const sliceWidth = canvasWidth * 1.0 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
    
        let v = dataArray[i] / 128.0;
        let y = v * canvasHeight / 2;
    
        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
    
          x += sliceWidth;
        }
        this.canvasCtx.lineTo(canvasWidth, canvasHeight / 2);
        this.canvasCtx.stroke();
      }
  }

}
