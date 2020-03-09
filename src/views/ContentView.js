import AppView from './AppView';
import './style/main.scss';

export default class ContentView extends AppView {
  constructor() {
    super();
    this.data = {};
  }

  getInfoAboutElements() {
    let widthOfWindow = (document.documentElement.clientWidth);
    let elementsPerPage = 4;
    let lastPage = 4;
    if (widthOfWindow < 1400) {
      widthOfWindow = (document.documentElement.clientWidth);
      elementsPerPage = 3;
      lastPage = 5;
    }
    if (widthOfWindow < 1100) {
      widthOfWindow = (document.documentElement.clientWidth);
      elementsPerPage = 2;
      lastPage = 8;
    }
    if (widthOfWindow < 650) {
      widthOfWindow = (document.documentElement.clientWidth);
      elementsPerPage = 1;
      lastPage = 16;
    }
    const DataLength = this.data.clipDate.length;
    const pageCount = (Math.trunc(DataLength / elementsPerPage));
    const allresultBoxesCount = (Math.trunc(DataLength / elementsPerPage) * elementsPerPage);
    const defresultBoxCount = (Math.trunc(16 / elementsPerPage) * elementsPerPage);
    return {
      widthOfWindow, elementsPerPage, lastPage, defresultBoxCount, pageCount, allresultBoxesCount,
    };
  }

  getLastPage() {
    const { elementsPerPage } = this.getInfoAboutElements();
    return (document.getElementsByClassName('result-box').length) / elementsPerPage;
  }

  createContentContainer(pageCount) {
    const { widthOfWindow } = this.getInfoAboutElements();
    const contentContainer = document.createElement('container');
    contentContainer.classList.add('content');
    contentContainer.setAttribute('data-scroll', 'scroll');
    contentContainer.style.left = '0';
    contentContainer.style.maxWidth = `${widthOfWindow * pageCount}px`;
    contentContainer.style.gridTemplateColumns = `repeat(${pageCount}, ${100 / pageCount}%)`;
    return contentContainer;
  }

  createResultContainer() {
    const { widthOfWindow, elementsPerPage } = this.getInfoAboutElements();
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('content__result-container', 'result-container');
    resultContainer.style.width = `${widthOfWindow}px`;
    resultContainer.style.gridTemplateColumns = `repeat(${elementsPerPage}, ${100 / elementsPerPage}%)`;
    return resultContainer;
  }

  getContent(data, from, to) {
    let res = '';

    for (let i = from; i < to; i += 1) {
      res += `<div class="content__result-box result-box">
      <div class="result-box__image-box">
        <img src="${data.clipImage[i]}" alt="" class="result-box__image">
        <div class="result-box__link-box">
          <a href="https://www.youtube.com/watch?v=${data.clipId[i]}" target="_blank" class="result-box__text result-box__text_bold">${data.clipName[i]}</a>
        </div>
      </div>
      <div class="result-box__video-info " >
        <div class="result-box__author">
          <img src="assets/images/result-box/user-icon.png" class="img-responsive" alt="user">
          <span class="result-box__text result-box__text_hover result-box__text_bold">${data.channelTitle[i]}</span>
        </div>
        <div class="result-box__date">
          <img src="assets/images/result-box/Без имени-1.png"class="img-responsive" alt="calendar">
          <span class="result-box__text result-box__text_hover result-box__text_bold">${data.clipDate[i]}</span>
        </div>
        <div class="result-box__view-count">
          <img src="assets/images/result-box/view-icon.png" class="img-responsive" alt="view-count">
          <span class="result-box__text result-box__text_hover result-box__text_bold">${data.clipViews[i]}</span>
        </div>
        <div class="result-box__clip-description">
          <span class="result-box__text result-box__text result-box__text_hover result-box__text_gray">${data.clipDescription[i]}</span>
        </div>
      </div>
    </div>`;
    }
    const content = this.createResultContainer();
    content.innerHTML = res;
    return content;
  }


  showContent(data) {
    this.data = data;
    const { elementsPerPage, pageCount, allresultBoxesCount } = this.getInfoAboutElements();
    const contentContainer = this.createContentContainer(pageCount);

    for (let i = 0; i < allresultBoxesCount;) {
      contentContainer.appendChild(this.getContent(data, i, i + elementsPerPage));
      i += elementsPerPage;
    }
    return contentContainer;
  }

  addNewContent(data) {
    const {
      widthOfWindow, elementsPerPage, lastPage, defresultBoxCount,
    } = this.getInfoAboutElements(data);
    const resContCount = document.getElementsByClassName('content__result-container').length;
    const content = document.querySelector('.content');

    for (let i = 0; i < defresultBoxCount;) {
      content.appendChild((this.getContent(data, i, i + elementsPerPage)));
      i += elementsPerPage;
    }
    content.style.maxWidth = `${parseInt(content.style.maxWidth, 10) + (widthOfWindow * (Math.trunc(16 / elementsPerPage)))}px`;
    content.style.gridTemplateColumns = `repeat(${resContCount + lastPage}, ${100 / (resContCount + lastPage)}%)`;
  }
}
