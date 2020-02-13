/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import AppView from './AppView';

export default class ContentView extends AppView {
  // constructor() {
  //   // this.AppView = new AppView();
  // }

  getInfoAboutElements(data) {
    let widthOfWindow = (document.documentElement.clientWidth);
    let elOnPage = 4;
    let lastPage = 4;
    if (widthOfWindow < 1400) {
      widthOfWindow = (document.documentElement.clientWidth);
      elOnPage = 3;
      lastPage = 5;
    }
    if (widthOfWindow < 1100) {
      widthOfWindow = (document.documentElement.clientWidth);
      elOnPage = 2;
      lastPage = 8;
    }
    if (widthOfWindow < 650) {
      widthOfWindow = (document.documentElement.clientWidth);
      elOnPage = 1;
      lastPage = 16;
    }
    const pageCount = (Math.trunc(16 / elOnPage));
    const resultBoxCount = (Math.trunc(16 / elOnPage) * elOnPage);
    return {
      widthOfWindow, elOnPage, lastPage, resultBoxCount, pageCount,
    };
  }

  getLastPage() {
    const { elOnPage } = this.getInfoAboutElements();
    return (document.getElementsByClassName('resultBox').length) / elOnPage;
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
    const { widthOfWindow, elOnPage } = this.getInfoAboutElements();
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('resultContainer');
    resultContainer.style.width = `${widthOfWindow}px`;
    resultContainer.style.gridTemplateColumns = `repeat(${elOnPage}, ${100 / elOnPage}%)`;
    return resultContainer;
  }

  getContent(data, from, to) {
    let res = '';
    for (let i = from; i < to; ++i) {
      // if (data.clipImage[i] === undefined) {
      //   continue;
      // }
      res += `<div class="resultBox">

      <div class="resultBox-image-box">
        <img src="${data.clipImage[i]}" alt="" class="resultBox-image">
        <div class="resultBox-link-box">
          <a href="https://www.youtube.com/watch?v=${data.videoId[i]}" target="_blank" class="resultBox-link">${data.clipName[i]}</a>
        </div>
      </div>
      <div class="resultBox-videoInfo">
        <div class="resultBox-author">
          <img src="/src/views/AppVIew/images/user-icon.png" class="img-responsive" alt="Image">
          <span >${data.channelTitle[i]}</span>
        </div>
        <div class="resultBox-date">
          <img src="/src/views/AppVIew/images/Без имени-1.png"class="img-responsive" alt="Image">
          <span>${data.clipDate[i]}</span>
        </div>
        <div class="resultBox-viewCount">
          <img src="/src/views/AppVIew/images/view-icon.png" class="img-responsive" alt="Image">
          <span >${data.clipViews[i]}</span>
        </div>
        <div class="resultBox-clipDescription">
          <span >${data.clipDescription[i]}</span>
        </div>
      </div>
    </div>`;
    }

    const content = this.createResultContainer();

    content.innerHTML = res;
    return content;
  }


  showContent(data) {
    const { elOnPage } = this.getInfoAboutElements();
    const resultBoxCount = (Math.trunc(data.clipDate.length / elOnPage) * elOnPage);
    const pageCount = (Math.trunc(data.clipDate.length / elOnPage));
    const contentContainer = this.createContentContainer(pageCount);

    for (let i = 0; i < resultBoxCount;) {
      contentContainer.appendChild(this.getContent(data, i, i + elOnPage));
      i += elOnPage;
    }
    return contentContainer;
  }

  addNewContent(data) {
    const {
      widthOfWindow, elOnPage, lastPage, resultBoxCount,
    } = this.getInfoAboutElements(data);
    const resContCount = document.getElementsByClassName('resultContainer').length;
    const content = document.querySelector('.content');
    for (let i = 0; i < resultBoxCount;) {
      content.appendChild((this.getContent(data, i, i + elOnPage)));
      i += elOnPage;
    }
    content.style.maxWidth = `${parseInt(content.style.maxWidth) + (widthOfWindow * (Math.trunc(16 / elOnPage)))}px`;
    content.style.gridTemplateColumns = `repeat(${resContCount + lastPage}, ${100 / (resContCount + lastPage)}%)`;
  }
}
