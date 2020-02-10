/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
import createResultBox from './createResultBox';

export default class AppView {
  constructor(titles) {
    this.titles = titles;
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
    <input id='serch-box-input' autocomplete="off"> </input>
    <button class='serch-box-btn' type='submit' data-serch='serch' display="none">Find</button>
    </form>`;
    return content;
  }

  createPagination() {
    const content = document.createElement('div');
    content.classList.add('pagination');
    content.innerHTML = `<div class="pagination-item" data-page="page" ></div>
    <div class="pagination-item" data-page="page" ></div>`;
    return content;
  }

  // Получаем данные из контроллера
  renderContent(data) {
    this.data = data;
    const content = document.getElementsByClassName('resultContainer');
    if (content.length > 0) {
      content[0].remove();
    }
    document.getElementsByTagName('main')[0].appendChild(createResultBox(this.data));
    document.getElementsByTagName('main')[0].appendChild(this.createPagination());
  }

  render(titles) {
    this.titles = titles;
    document.body.appendChild(this.createSerchBox());
    document.body.appendChild(this.createTemplate());
  }
}
