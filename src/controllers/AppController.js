/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Hammer from 'hammerjs';
import AppModel from '../models/AppModel';
import ContentView from '../views/ContentView';

export default class App {
  constructor() {
    this.model = new AppModel();
    this.view = new ContentView();
    this.dataFromAllResponces = {};
  }

  async getDataFromModel() {
    const searchName = document.getElementById('serch-box__input').value;
    const data = await this.model.getClipData(searchName);
    this.setDataFromAllResponces(data);
    return data;
  }

  async sendDataToRenderContent() {
    const data = await this.getDataFromModel(this.model, this.view);
    this.view.renderNewContent(data);
    this.swipe(this.view, this);
  }

  setDataFromAllResponces(data) {
    if (Object.values(this.dataFromAllResponces).length === 0) {
      this.dataFromAllResponces = data;
    } else {
      for (const val of Object.keys(data)) {
        this.dataFromAllResponces[val] = this.dataFromAllResponces[val].concat(data[val]);
      }
    }
  }

  resizeContent() {
    this.view.renderNewContent(this.dataFromAllResponces);
  }

  getPage(val) {
    const maxWidth = parseInt(document.querySelector('.content').style.maxWidth);
    const leftCoords = (val - 1) * -document.documentElement.clientWidth;
    document.querySelector('.content').style.left = `${leftCoords}px`;
    document.getElementById('pagination-right').dataset.rightval = val;
    if (-1 * maxWidth >= leftCoords) {
      document.querySelector('.content').style.left = `${-maxWidth + +window.innerWidth}px`;
      document.getElementById('pagination-right').dataset.rightval = Math.round(maxWidth / window.innerWidth);
    }
  }

  getHandlers(view, scope) {
    return {
      async serch() {
        view.removePrevContent();
        scope.sendDataToRenderContent();
      },
      async  resize(windowSize, pageNumber) {
        this.windowSize = document.documentElement.clientWidth;
        if (document.getElementsByClassName('content').length > 0) {
          if (document.documentElement.clientWidth !== windowSize) {
            view.removePrevContent();
            scope.resizeContent(view);
            scope.getPage(pageNumber);
          }
        }
      },
      async getNextPage() {
        const windowWidth = (document.documentElement.clientWidth);
        const right = document.querySelector('#pagination-right');
        const mulValue = +right.dataset.rightval;
        const resultContainer = document.querySelector('.content');
        resultContainer.style.left = `${mulValue * -windowWidth}px`;
        right.dataset.rightval = +mulValue + 1;
        if (+right.dataset.rightval > view.getLastPage()) {
          const data = await scope.getDataFromModel();
          view.addNewContent(data);
          scope.removeSwipe();
          scope.swipe(view, scope);
        }
      },
      getPrevPage() {
        const windowWidth = (document.documentElement.clientWidth);
        const rightPageButton = document.getElementById('pagination-right');
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
    };
  }

  setEventHandlers(view, scope) {
    const handlers = this.getHandlers(view, scope);
    let windowSize = (document.documentElement.clientWidth);
    document.addEventListener('click', (e) => {
      console.log(e.target);
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
      const pageNumber = document.querySelector('#pagination-right').dataset.rightval;
      windowSize = (document.documentElement.clientWidth);
      setTimeout(() => {
        handlers.resize(prevwindowSize, pageNumber);
      }, 500);
    });
  }


  async swipe(view, scope) {
    const handlers = this.getHandlers(view, scope);
    const resContainers = document.querySelectorAll('.result-container');

    for (let i = 0; i < resContainers.length; i += 1) {
      const manager = new Hammer(resContainers[i]);
      manager.on('swipeleft', () => {
        handlers.getNextPage();
      });
    }
    for (let i = 0; i < resContainers.length; i += 1) {
      const manager = new Hammer(resContainers[i]);
      manager.on('swiperight', () => {
        handlers.getPrevPage();
      });
    }
  }

  removeSwipe() {
    const resContainers = document.querySelectorAll('.result-container');
    for (let i = 0; i < resContainers.length; i += 1) {
      resContainers[i].removeEventListener('leftswipe', undefined, !1);
    }
  }

  async start() {
    this.view.render();
    this.setEventHandlers(this.view, this);
  }
}