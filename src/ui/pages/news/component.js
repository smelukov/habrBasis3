let Page = require('../Page');
let Value = require('basis.data').Value;
let News = require('app.type.news');
let format = require('basis.date').format;
let Filter = require('basis.data.dataset').Filter;
let textOnlyNews = new Filter({
  source: News.all,
  state: Value.query('source.state'),
  rule: 'data.text',
  deprecate() {
    this.source.deprecate();
  }
});

module.exports = new Page({
  template: resource('./list.tmpl'),
  dataSource: textOnlyNews,
  childClass: {
    template: resource('./item.tmpl'),
    binding: {
      text: 'data:',
      date: Value.query('data.date').as(format('%D.%M.%Y %H:%I:%S'))
    }
  }
});
