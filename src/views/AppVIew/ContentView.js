/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */


export default class ContentView {
  chekWindowSize() {
    const widthOfWindow = (document.documentElement.clientWidth);
    let elemOnPage = 4;
    let lastPage = 4;
    if (widthOfWindow < 1400) {
      elemOnPage = 3;
      lastPage = 6;
    }
    return { widthOfWindow, elemOnPage, lastPage };
  }

  createContentContainer(elemCount) {
    const { widthOfWindow } = this.chekWindowSize();
    const contentContainer = document.createElement('container');
    contentContainer.classList.add('content');
    contentContainer.setAttribute('data-scroll', 'scroll');
    contentContainer.style.left = `${10}px`;
    contentContainer.style.maxWidth = `${widthOfWindow * elemCount}px`;
    contentContainer.style.gridTemplateColumns = `repeat(${elemCount}, ${100 / elemCount}%)`;
    return contentContainer;
  }

  createResultContainer() {
    const { widthOfWindow, elemOnPage } = this.chekWindowSize();
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('resultContainer');
    resultContainer.style.width = `${widthOfWindow}px`;
    resultContainer.style.gridTemplateColumns = `repeat(${elemOnPage}, ${100 / elemOnPage}%)`;
    return resultContainer;
  }

  getContent(data, from, to) {
    let res = '';
    for (let i = from; i < to; ++i) {
      if (data.clipImage[i] === undefined) {
        continue;
      }
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
    const { elemOnPage } = this.chekWindowSize();
    const elemCount = Math.ceil(data.clipDate.length / elemOnPage);
    const contentContainer = this.createContentContainer(elemCount);
    for (let i = 0; i < data.clipDate.length;) {
      contentContainer.appendChild(this.getContent(data, i, i + elemOnPage));
      i += elemOnPage;
    }
    return contentContainer;
  }
}
