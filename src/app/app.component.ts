import { Component, Input } from '@angular/core';
import { VisualizerComponent } from './visualizer/visualizer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '音の可視化';
}
