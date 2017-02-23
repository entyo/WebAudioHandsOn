/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { VisualizerComponent } from './visualizer.component';
import { SoundHistogramComponent } from './sound-histogram/sound-histogram.component';
import { SoundWaveComponent } from './sound-wave/sound-wave.component';
import { AudioService } from '../audio.service';

describe('VisualizerComponent', () => {
  let component: VisualizerComponent;
  let fixture: ComponentFixture<VisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AudioService
      ],
      imports: [
        FormsModule
      ],
      declarations: [ 
        VisualizerComponent,
        SoundHistogramComponent,
        SoundWaveComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
