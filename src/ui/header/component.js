let Node = require('basis.ui').Node;
let DataObject = require('basis.data').Object;
let vkApi = require('app.vkApi');

let dataSource = new DataObject({
  data: {
    firstName: '',
    lastName: ''
  },
  syncAction() {
    return vkApi.me().then(me => {
      this.update({firstName: me.first_name, lastName: me.last_name});
    });
  }
});

module.exports = Node.subclass({
  active: basis.PROXY,
  delegate: dataSource,
  template: resource('./template.tmpl'),
  binding: {
    firstName: 'data:',
    lastName: 'data:'
  }
});
