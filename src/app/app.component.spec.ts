import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
// For <select>, <option>, etc... 
import { FormsModule } from '@angular/forms';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { FilterComponent } from './filter/filter.component';
import { SoundWaveComponent } from './visualizer/sound-wave/sound-wave.component';
import { SoundHistogramComponent } from './visualizer/sound-histogram/sound-histogram.component';
import { AudioService } from './audio.service';
import { FakeAudioService } from './fake-audio.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        VisualizerComponent,
        SoundWaveComponent,
        SoundHistogramComponent,
        FilterComponent
      ],
      providers: [
        // stubなserviceをinjectする
        { provide: AudioService, useClass: FakeAudioService}
      ]
    });
    TestBed.compileComponents();
  });

  describe('正常系: ', () => {
    it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

    it(`should have as title '音の可視化'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('音の可視化');
    }));
  });

});
