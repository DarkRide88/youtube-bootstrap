/* eslint-disable no-plusplus */
export default function createResultBox(data) {
  const content = document.createElement('div');
  content.classList.add('resultContainer');
  let res = '';
  for (let i = 0; i < data.clipImage.length; ++i) {
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
        <img src="/src/views/AppVIew/images/Без имени-1.png" class="img-responsive" alt="Image">
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
  content.innerHTML = res;
  return content;
}
