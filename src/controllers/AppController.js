import AppModel from '../models/AppModel';
import AppView from '../views/AppVIew';


export default class App {
  constructor() {
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDjTvt3DwNkyBnVPM3GXkZKLcMFbyQuEKI&part=snippet&type=video&maxResults=15&q=дота',
    };
  }

  async start() {
    const model = new AppModel(this.state);

    const data = await model.getClipNames();
    const view = new AppView(data);

    view.render();
  }
}
