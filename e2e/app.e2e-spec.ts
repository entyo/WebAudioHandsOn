import { SoundVisualizePage } from './app.po';

describe('sound-visualize App', function() {
  let page: SoundVisualizePage;

  beforeEach(() => {
    page = new SoundVisualizePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
