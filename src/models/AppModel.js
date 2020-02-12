/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
export default class AppModel {
  static extractClimpNames(data) {
    return data.items.map((clip) => clip.snippet.title);
  }

  static extractClimpDate(data) {
    return data.items.map((clip) => {
      const date = new Date(clip.snippet.publishedAt);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (+month < 10) {
        month = `0${month}`;
      }
      if (+day < 10) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    });
  }

  static extractClimpImage(data) {
    return data.items.map((clip) => clip.snippet.thumbnails.high.url);
  }

  static extractChannelTitle(data) {
    return data.items.map((clip) => clip.snippet.channelTitle);
  }

  static extractClipId(data) {
    return data.items.map((clip) => clip.id.videoId);
  }

  static extractClipDescription(data) {
    return data.items.map((clip) => clip.snippet.description);
  }

  async extractClipViews(data) {
    const resArr = data.items.map((clip) => clip.id.videoId).join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${resArr}&part=snippet,statistics`;

    const responce = await fetch(url);
    const clipViews = await responce.json();
    const ViewsCount = clipViews.items.map((clip) => clip.statistics.viewCount);
    return ViewsCount;
  }


  async getClipData(searchName) {
    this.searchName = searchName;
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&part=snippet&type=video&maxResults=16&q=${this.searchName}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const clipView = await this.extractClipViews(data);
    return {
      clipName: AppModel.extractClimpNames(data),
      clipDate: AppModel.extractClimpDate(data),
      clipImage: AppModel.extractClimpImage(data),
      channelTitle: AppModel.extractChannelTitle(data),
      videoId: AppModel.extractClipId(data),
      clipDescription: AppModel.extractClipDescription(data),
      clipViews: clipView,
    };
  }
}
