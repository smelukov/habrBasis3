let Page = require('../Page');
let Friends = require('app.type.friends');
let dataSource = Friends.all;

module.exports = new Page({
  template: resource('./list.tmpl'),
  dataSource: dataSource,
  childClass: {
    template: resource('./item.tmpl'),
    binding: {
      photo: 'data:',
      first_name: 'data:',
      last_name: 'data:'
    }
  }
});
