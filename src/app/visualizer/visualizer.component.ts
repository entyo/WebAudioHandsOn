import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent {
  private ways: Array<string> = [
    "histogram",
    "wave"
  ];
  private selectedWay: string = this.ways[0];

  onChange() {
    console.log("selectedWay: ", this.selectedWay);
  };

}
