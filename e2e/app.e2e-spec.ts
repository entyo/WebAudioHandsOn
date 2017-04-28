import { SoundVisualizerPage } from './app.po';

describe('sound-visualizer App', () => {
  let page: SoundVisualizerPage;

  beforeEach(() => {
    page = new SoundVisualizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
