let AbstractData = require('basis.data').AbstractData;
let STATE = require('basis.data').STATE;
let event = require('basis.event');
let config = require('app.config');

module.exports = new AbstractData({
  init() {
    AbstractData.prototype.init.call(this);

    global.VK.init({
      apiId: config.apiId
    });
  },

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      global.VK.Auth.getLoginStatus(response => {
        response.status === 'connected' ? resolve() : reject();
      });
    });
  },
  login() {
    this.setState(STATE.PROCESSING);
    this.isLoggedIn().then(
      () => this.setState(STATE.READY),
      () => {
        global.VK.Auth.login(response => {
          this.setState(response.session ? STATE.READY : STATE.UNDEFINED);
        }, config.perms);
      });
  },
  logout() {
    global.VK.Auth.logout();
    this.setState(STATE.UNDEFINED);
  },
  callApi(method, params = {}) {
    return this.isLoggedIn()
      .catch(e => Promise.reject(new Error('Ошибка авторизации!')))
      .then(
        ()=> {
          return new Promise((resolve, reject) => {
            basis.object.complete(params, {v: config.version});

            global.VK.api(method, params, response => {
              if (response.error) {
                reject(new Error(response.error.error_msg));
              } else {
                resolve(response.response);
              }
            });
          });
        },
        e => {
          this.setState(STATE.ERROR, e.message);
          throw e;
        })
  },

  me() {
    return this.callApi('users.get').then(r => r[0]);
  },
  audio() {
    return this.callApi('audio.get').then(r => r.items);
  },
  news(count = 20) {
    return this.callApi('newsfeed.get', {filters: 'post', count}).then(r => r.items);
  },
  friends() {
    return this.callApi('friends.get', {fields: 'photo_100'}).then(r => r.items);
  }
});
