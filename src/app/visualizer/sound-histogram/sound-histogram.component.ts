import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AudioService } from '../../audio.service'

@Component({
  selector: 'app-sound-histogram',
  templateUrl: './sound-histogram.component.html',
  styleUrls: ['./sound-histogram.component.css']
})

export class SoundHistogramComponent implements AfterViewInit {
  private canvasCtx: CanvasRenderingContext2D;
  private analyser: AnalyserNode;
  private requestID: number;

  @ViewChild("histogram") histCanvas;

  constructor(private audio: AudioService) {}

  // Canvas(#wave)が初期化されたあとに実行される
  ngAfterViewInit() {
    this.canvasCtx = this.histCanvas.nativeElement.getContext("2d");
    const width = this.canvasCtx.canvas.width;
    const height = this.canvasCtx.canvas.height;
    this.canvasCtx.clearRect(0, 0, width, height);
    
    this.analyser = this.audio.getAnalyser();
    this.analyser.fftSize = 256;
    this.draw();
  }

  draw() {
    const width = this.canvasCtx.canvas.width;
    const height = this.canvasCtx.canvas.height;
    if(this.canvasCtx) {
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      this.requestID = requestAnimationFrame(this.draw.bind(this)); // 再帰的に描画する
      this.analyser.getByteFrequencyData(dataArray);

      this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      this.canvasCtx.fillRect(0, 0, width, height);

      let barWidth = (width / bufferLength) * 2.5;
      let barHeight: number;
      let x = 0;

      for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        this.canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ', 50, 50)';
        this.canvasCtx.fillRect(x, height - barHeight/2, barWidth, barHeight/2);

        x += barWidth + 1;
      }
    }
  }
}
