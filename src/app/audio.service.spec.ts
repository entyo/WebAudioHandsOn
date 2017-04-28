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

    it('should disconnect all nodes at once', () => {
      audioService.disconnectAll()
      .then(() => {
        // Test goes here
      })
      .catch(e => {
        fail(e);
      });
    });

    it('should connect lowshelf filter', () => {
      audioService.connectFilters(['lowshelf'])
      .then(() => {
        // Test goes here
      })
      .catch(e => {
        fail(e);
      });
    });

    it('should connect highshelf filter', () => {
      audioService.connectFilters(['highshelf'])
      .then(() => {
        // Test goes here
      })
      .catch(e => {
        fail(e);
      });
    });

    it('should connect all filters', () => {
      audioService.connectFilters(['lowshelf', 'highshelf'])
      .then(() => {
        // Test goes here
      })
      .catch(e => {
        fail(e);
      });
    });

  });

  describe('異常系: ', () => {
  });

});