/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
// import createContentContainer from './createContentContainer';
import ContentView from './ContentView';

export default class AppView {
  constructor(titles) {
    this.titles = titles;
    this.content = new ContentView();
  }

  createTemplate() {
    const main = document.createElement('main');
    main.innerHTML = '<div class="main-background"></div>';
    return main;
  }

  createSerchBox() {
    const content = document.createElement('header');
    content.classList.add('serch-box');
    content.innerHTML = `<form id='serchForm'; return false>
    <input id='serch-box-input' autocomplete="off" placeholder="input video name"> </input>
    <button class='serch-box-btn' type='submit' data-handler='serch' display="none">Find</button>
    </form>`;
    return content;
  }

  createPagination() {
    const content = document.createElement('div');
    content.classList.add('pagination');
    content.innerHTML = `<div id="left" class="pagination-item" data-handler="getPrevPage" data-leftval="0" ></div>
    <div id="right" class="pagination-item" data-handler="getNextPage" data-rightval="1"></div>`;
    return content;
  }

  removePrevContent() {
    const content = document.getElementsByClassName('content');
    const pagination = document.getElementsByClassName('pagination');
    if (content.length > 0 || pagination.length > 0) {
      content[0].remove();
      pagination[0].remove();
    }
  }

  renderNewContent(data) {
    this.maneData = data;
    document.getElementsByTagName('main')[0].appendChild(this.content.showContent(this.maneData));
    document.getElementsByTagName('main')[0].appendChild(this.createPagination());
  }

  render(titles) {
    this.titles = titles;
    document.body.appendChild(this.createSerchBox());
    document.body.appendChild(this.createTemplate());
  }
}
