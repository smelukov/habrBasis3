let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;
let Node = require('basis.ui').Node;
let router = require('basis.router');
let Header = require('app.ui.header.component');
let Menu = require('app.ui.menu.component');

let vkApi = require('app.vkApi');
let apiState = Value.state(vkApi);
let defaultRoute = 'news';
let pageByName = {
  news: resource('./ui/pages/news/component.js'),
  friends: resource('./ui/pages/friends/component.js'),
  audio: resource('./ui/pages/audio/component.js'),
  notFound: resource('./ui/pages/404/component.js')
};

require('basis.app').create({
  title: 'VK Client by Basis.JS',
  element: new Node({
    active: apiState.as(state => state == STATE.READY),
    disabled: apiState.as(state => state == STATE.PROCESSING),
    template: resource('./template.tmpl'),
    binding: {
      header: 'satellite:',
      menu: 'satellite:',
      page: 'satellite:',
      error: apiState.as(state => state == STATE.ERROR && state.data)
    },
    satellite: {
      header: Header,
      menu: Menu,
      page: router.route(':page').param('page').as(page => pageByName[page] || pageByName.notFound)
    },
    action: {
      login() {
        vkApi.login();
      }
    }
  })
}).ready(() => {
  router.route('*page').param('page').as(page => page || router.navigate(defaultRoute, true));
  vkApi.login();
});
