let entity = require('basis.entity');
let vkApi = require('app.vkApi');

let News = entity.createType('News', {
  text: String,
  date: Date
});

News.extendReader(data => data.date *= 1000);
News.all.setSyncAction(() => vkApi.news().then(News.all.set));

module.exports = News;
