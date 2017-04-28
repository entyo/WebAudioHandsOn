import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterComponent } from './filter/filter.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';

import { AudioService } from '../audio.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FilterComponent, 
    AnalyzerComponent
  ],
  exports: [
    FilterComponent,
    AnalyzerComponent,
  ],
  providers: [
    AudioService
  ]
})
export class VisualizerModule { }
