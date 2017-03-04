/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';

import { AudioService } from '../audio.service';
import { FakeAudioService } from '../fake-audio.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let audioService: AudioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FilterComponent ],
      providers: [ 
        {
          provide: AudioService,
          useClass: FakeAudioService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    audioService = TestBed.get(AudioService);
  }));

  describe('正常系: ', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

});
