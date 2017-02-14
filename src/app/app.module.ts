import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SoundWaveComponent } from './sound-wave/sound-wave.component';
import { SoundHistogramComponent } from './sound-histogram/sound-histogram.component';
import { VisualizerComponent } from './visualizer/visualizer.component'

@NgModule({
  declarations: [
    AppComponent,
    SoundWaveComponent,
    SoundHistogramComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
