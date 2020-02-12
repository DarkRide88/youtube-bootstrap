/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import AppModel from '../models/AppModel';
import AppView from '../views/AppVIew';
// import Content from '../views/AppVIew/createContentContainer';

export default class App {
  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
  }

  static async sendContentToRender(model, view) {
    const searchName = document.getElementById('serch-box-input').value;
    const data = await model.getClipData(searchName);
    view.renderContent(data);
  }

  getHandlers(model, view) {
    return {
      async serch() {
        App.sendContentToRender(model, view);
      },

      async getNextPage(e) {
        const windowWidth = (document.documentElement.clientWidth);
        const mulValue = +e.target.dataset.rightval;
        const resultContainer = document.querySelector('.content');
        resultContainer.style.left = `${mulValue * -windowWidth}px`;
        e.target.dataset.rightval = +mulValue + 1;
        // if (e.target.dataset.rightvalue > 3) {
        //   App.getContent(model, view);
        // }
      },
      getPrevPage() {
        const windowWidth = (document.documentElement.clientWidth);
        const rightPageButton = document.getElementById('right');
        const mulValue = rightPageButton.dataset.rightval - 2;
        const resultContainer = document.querySelector('.content');
        if (mulValue <= 0) {
          resultContainer.style.left = `${10}px`;
          rightPageButton.dataset.rightval = 1;
        } else {
          resultContainer.style.left = `${mulValue * -windowWidth}px`;
          resultContainer.style.left = +resultContainer.style.left - 1;
          rightPageButton.dataset.rightval -= 1;
        }
      },
      scroll() {
        // console.log(e.target.getBoundingClientRect());
      },
      async  resize() {
        if (document.getElementsByClassName('content').length > 0) {
          App.sendContentToRender(model, view);
        }
      },
    };
  }

  setEventHandlers(model, view) {
    const handlers = this.getHandlers(model, view);
    document.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        e.preventDefault();
      }

      if (Object.keys(e.target.dataset).length !== 0) {
        const handlersFromData = e.target.dataset.handler.split(',');
        handlersFromData.forEach((element) => {
          handlers[element](e);
        });
      }
    });

    window.addEventListener('resize', () => {
      setTimeout(() => {
        handlers.resize(this.model, this.view);
      }, 100);
    });
  }

  async start() {
    this.view.render();
    this.setEventHandlers(this.model, this.view);
  }
}
