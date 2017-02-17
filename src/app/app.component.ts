import { Component, Inject } from '@angular/core';
import { VisualizerComponent } from './visualizer/visualizer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title: string = '音の可視化';
}
