let Node = require('basis.ui').Node;
let router = require('basis.router');

module.exports = new Node({
  template: resource('./template.tmpl'),
  action: {
    home() {
      router.navigate('');
    }
  }
});
