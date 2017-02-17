import { Component } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent {
  private visualizers: Array<string> = [
    "histogram",
    "wave"
  ];
  private selectedVisualizer: string = this.visualizers[0];

  onChange() {
    console.log("selectedVisualizer: ", this.selectedVisualizer);
  };

}
