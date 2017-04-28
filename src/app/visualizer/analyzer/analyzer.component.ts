import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AudioService } from '../../audio.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements AfterViewInit {
  private canvasCtx: CanvasRenderingContext2D;
  private analyser: AnalyserNode;
  private requestID: number;
  private visualizers: Array < string > = [
    "histogram",
    "wave"
  ];
  private selectedVisualizer: string;

  @ViewChild("visualizer") canvas;

  constructor(private audio: AudioService) {
    this.selectedVisualizer = this.visualizers[0];
  };

  // ヴィジュアライザが選択される度に呼ばれる
  onChange() {
    console.log("selectedVisualizer: ", this.selectedVisualizer);
    this.draw();
  }

  // Canvasが初期化されたあとに実行される
  ngAfterViewInit() {
    this.canvasCtx = this.canvas.nativeElement.getContext("2d");
    this.analyser = this.audio.getAnalyser();
    this.draw();
  }

  draw() {
    if (!this.canvasCtx) {
      return;
    }
    const width = this.canvasCtx.canvas.width;
    const height = this.canvasCtx.canvas.height;
    this.canvasCtx.clearRect(0, 0, width, height);
    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, width, height);
    
    if (this.selectedVisualizer === 'histogram') {
      this.analyser.fftSize = 256; // Default fft size is too large
    } else if (this.selectedVisualizer === 'wave') {
      this.analyser.fftSize = 2048; // Default size
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    this.requestID = requestAnimationFrame(this.draw.bind(this)); // 再帰的に描画する

    if (this.selectedVisualizer === 'histogram') {
      this.analyser.getByteFrequencyData(dataArray);

      let barWidth = (width / bufferLength) * 2.5;
      let barHeight: number;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
        this.canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    } else if (this.selectedVisualizer === 'wave') {
      this.analyser.getByteTimeDomainData(dataArray);

      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = 'rgb(0, 255, 0)';
      this.canvasCtx.beginPath();

      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * height / 2;

        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      this.canvasCtx.lineTo(width, height / 2);
      this.canvasCtx.stroke();
    }
  }
}