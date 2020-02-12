/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
export default class Content {
  constructor() {
    this.widthOfWindow = (document.documentElement.clientWidth);
    this.elemOnPage = 4;
    if (this.widthOfWindow < 1350) {
      this.elemOnPage = 3;
    }
  }

  createContentContainer(elemCount) {
    const contentContainer = document.createElement('container');
    contentContainer.classList.add('content');
    contentContainer.setAttribute('data-scroll', 'scroll');
    contentContainer.style.left = `${10}px`;
    contentContainer.style.maxWidth = `${this.widthOfWindow * elemCount}px`;
    contentContainer.style.gridTemplateColumns = `repeat(${elemCount}, ${100 / elemCount}%)`;
    return contentContainer;
  }

  createResultContainer() {
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('resultContainer');
    resultContainer.style.width = `${this.widthOfWindow}px`;
    resultContainer.style.gridTemplateColumns = `repeat(${this.elemOnPage}, ${100 / this.elemOnPage}%)`;
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
    const elemCount = Math.ceil(data.clipDate.length / this.elemOnPage);
    const contentContainer = this.createContentContainer(elemCount);
    for (let i = 0; i < data.clipDate.length;) {
      contentContainer.appendChild(this.getContent(data, i, i + this.elemOnPage));
      i += this.elemOnPage;
    }
    return contentContainer;
  }
}
