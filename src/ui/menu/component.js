let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let vkApi = require('app.vkApi');
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));

module.exports = Node.subclass({
  template: resource('./template.tmpl'),
  action: {
    logout() {
      vkApi.logout();
    }
  },
  childClass: {
    template: resource('./item.tmpl'),
    selected: currentPage.compute((node, page) => node.url == page),
    binding: {
      title: 'title'
    },
    action: {
      click() {
        router.navigate(this.url);
      }
    }
  },
  childNodes: [
    {title: 'Новости', url: 'news'},
    {title: 'Друзья', url: 'friends'},
    {title: 'Музыка', url: 'audio'}
  ]
});
