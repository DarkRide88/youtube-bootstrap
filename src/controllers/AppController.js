/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import AppModel from '../models/AppModel';
import ContentView from '../views/AppVIew';
// import Content from '../views/AppVIew/createContentContainer';

export default class App {
  constructor() {
    this.model = new AppModel();
    this.view = new ContentView();
    this.windowWidth = 0;
    App.globalData = {};
  }

  static async getDataFromModel(model) {
    const searchName = document.getElementById('serch-box-input').value;
    const data = await model.getClipData(searchName);
    App.setGlobalData(data);
    return data;
  }

  static setGlobalData(data) {
    if (Object.values(App.globalData).length === 0) {
      App.globalData = data;
    } else {
      for (const val of Object.keys(data)) {
        App.globalData[val] = App.globalData[val].concat(data[val]);
      }
    }
  }

  static async sendContentToRender(model, view) {
    const data = await App.getDataFromModel(model, view);
    view.renderNewContent(data);
  }

  static resizeContent(view) {
    view.renderNewContent(App.globalData);
  }

  static getPage(val) {
    document.querySelector('.content').style.left = `${(val - 1) * -document.documentElement.clientWidth}px`;
    document.getElementById('right').dataset.rightval = val;
  }

  getHandlers(model, view, scope) {
    return {
      async serch() {
        view.removePrevContent();
        console.log(scope);
        App.sendContentToRender(model, view);
      },

      async getNextPage(e) {
        const windowWidth = (document.documentElement.clientWidth);
        const mulValue = +e.target.dataset.rightval;
        const resultContainer = document.querySelector('.content');
        resultContainer.style.left = `${mulValue * -windowWidth}px`;
        e.target.dataset.rightval = +mulValue + 1;
        if (+e.target.dataset.rightval > view.getLastPage()) {
          const data = await App.getDataFromModel(model, view);
          view.addNewContent(data);
        }
      },
      getPrevPage() {
        const windowWidth = (document.documentElement.clientWidth);
        const rightPageButton = document.getElementById('right');
        const mulValue = rightPageButton.dataset.rightval - 2;
        const resultContainer = document.querySelector('.content');
        if (mulValue <= 0) {
          resultContainer.style.left = `${0}px`;
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
      async  resize(windowSize, pageNumber) {
        this.windowSize = document.documentElement.clientWidth;
        if (document.getElementsByClassName('content').length > 0) {
          if (document.documentElement.clientWidth !== windowSize) {
            console.log(view.resizeContent);
            view.removePrevContent();
            App.resizeContent(view);
            App.getPage(pageNumber);
          }
        }
      },
    };
  }


  setEventHandlers(model, view, scope) {
    const handlers = this.getHandlers(model, view, scope);
    let windowSize = (document.documentElement.clientWidth);
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
      const prevwindowSize = windowSize;
      const pageNumber = document.querySelector('#right').dataset.rightval;
      windowSize = (document.documentElement.clientWidth);
      setTimeout(() => {
        handlers.resize(prevwindowSize, pageNumber);
      }, 500);
    });
  }

  async start() {
    console.log(this);
    console.log(this.view);
    this.view.render();
    this.setEventHandlers(this.model, this.view, this);
  }
}
