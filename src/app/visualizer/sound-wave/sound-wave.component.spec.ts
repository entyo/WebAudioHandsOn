/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoundWaveComponent } from './sound-wave.component';

describe('SoundWaveComponent', () => {
  let component: SoundWaveComponent;
  let fixture: ComponentFixture<SoundWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
