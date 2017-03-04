import { TestBed, async, inject } from '@angular/core/testing';
import { AudioService } from './audio.service';
import * as global from './global';

describe('AudioService', () => {
  let audioService: AudioService;
  
  beforeEach(() => {
    audioService = new AudioService();
  });

  describe('正常系: ', () => {
    it('should ...', () => {
      expect(audioService).toBeTruthy();
    });

    it('should create lowshelf filter', () => {
      let filter = audioService.createLowShelfFilter();
      expect(filter.type).toBe('lowshelf');
    });

    it('should create highshelf filter', () => {
      let filter = audioService.createHighShelfFilter();
      expect(filter.type).toBe('highshelf');
    });

    // MediaStreamが自動で(ユーザの許可なしに)取得できなくて死ぬ
    it('should disconnect all nodes at once', () => {
      
      audioService.disconnectAll();
      let analyser = audioService.getAnalyser();
      expect(analyser.numberOfInputs).toBe(0);
      expect(analyser.numberOfOutputs).toBe(0);
    });
  });

  describe('異常系: ', () => {
  });
});
