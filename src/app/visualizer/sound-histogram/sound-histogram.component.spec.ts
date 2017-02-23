/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoundHistogramComponent } from './sound-histogram.component';
import { AudioService } from '../../audio.service';

describe('SoundHistogramComponent', () => {
  let component: SoundHistogramComponent;
  let fixture: ComponentFixture<SoundHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundHistogramComponent ],
      providers: [ AudioService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
