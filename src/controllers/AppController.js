/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import AppModel from '../models/AppModel';
import AppView from '../views/AppVIew';

export default class App {
  eventHandlers(model, view) {
    const obj = {
      async serch() {
        const searchName = document.getElementById('serch-box-input').value;
        const data = await model.getClipNames(searchName);
        view.renderContent(data);
      },
    };

    document.addEventListener('click', (e) => {
      console.log(e.target.tagName);
      if (e.target.tagName !== 'A') {
        e.preventDefault();
      }

      if (Object.keys(e.target.dataset).length !== 0) {
        const handlers = Object.keys(e.target.dataset);
        handlers.forEach((element) => {
          obj[element]();
        });
      }
    });
  }

  async start() {
    const model = new AppModel();
    const view = new AppView();
    view.render();
    this.eventHandlers(model, view);
  }
}
