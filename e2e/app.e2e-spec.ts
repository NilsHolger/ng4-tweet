import { Ng4TweetPage } from './app.po';

describe('ng4-tweet App', () => {
  let page: Ng4TweetPage;

  beforeEach(() => {
    page = new Ng4TweetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
