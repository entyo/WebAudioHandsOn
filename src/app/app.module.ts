import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SoundWaveComponent } from './visualizer/sound-wave/sound-wave.component'
import { SoundHistogramComponent } from './visualizer/sound-histogram/sound-histogram.component';
import { VisualizerComponent } from './visualizer/visualizer.component'
  
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FilterComponent } from './filter/filter.component';

import { AudioService } from './audio.service'

@NgModule({
  declarations: [
    AppComponent,
    SoundWaveComponent,
    SoundHistogramComponent,
    VisualizerComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule.forRoot(),
  ],
  bootstrap: [ AppComponent ],
  providers: [
    AudioService,
    {
      provide: 'audioContext',
      useValue: new(window['AudioContext'] || window['webkitAudioContext'])
    }
  ]
})
export class AppModule { }
