let Value = require('basis.data').Value;
let Page = require('../Page');
let Audio = require('app.type.audio');
let format = require('basis.date').format;
let dataSource = Audio.all;

module.exports = new Page({
  template: resource('./list.tmpl'),
  dataSource: dataSource,
  childClass: {
    template: resource('./item.tmpl'),
    binding: {
      artist: 'data:',
      title: 'data:',
      duration: Value.query('data.duration').as(format('%I:%S'))
    }
  }
});
