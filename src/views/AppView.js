/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
export default class AppView {
  constructor(titles) {
    this.titles = titles;
  }

  createMainBlock() {
    const main = document.createElement('main');
    main.classList.add('main');
    main.innerHTML = '<div class="main__background" style="   background-image: url(assets/images/background/SM_Icon_Youtube.png) ;"></div>';
    return main;
  }

  createSerchBox() {
    const header = document.createElement('header');
    header.classList.add('header');
    const searchBox = document.createElement('div');
    searchBox.classList.add('serch-box');
    searchBox.innerHTML = `<form id='serch-box_form'; return false>
    <input id='serch-box__input' class='serch-box__input' autocomplete="off" placeholder="input video name" style="background: url(assets/images/serch-box/find.png) no-repeat 1% 50%; background-size:20px;"> </input>
    <button class='serch-box__button' type='submit' data-handler='serch' display="none">Find</button>
    </form>`;
    header.appendChild(searchBox);
    return header;
  }

  createPagination() {
    const content = document.createElement('div');
    content.classList.add('pagination');
    content.innerHTML = `<div id="pagination-left" class="pagination__item pagination__left" data-handler="getPrevPage" data-leftval="0" ></div>
    <div id="pagination-right" class="pagination__item pagination__right" data-handler="getNextPage" data-rightval="1"></div>`;
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
    document.getElementsByTagName('main')[0].appendChild(this.showContent(this.maneData));
    document.getElementsByTagName('main')[0].appendChild(this.createPagination());
  }

  render(titles) {
    this.titles = titles;
    document.body.appendChild(this.createSerchBox());
    document.body.appendChild(this.createMainBlock());
  }

  func() {

  }
}
