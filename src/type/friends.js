let entity = require('basis.entity');
let vkApi = require('app.vkApi');

let Friends = entity.createType('Friends', {
  photo: String,
  first_name: String,
  last_name: String
});

Friends.extendReader(data => data.photo = data.photo_100);
Friends.all.setSyncAction(() => vkApi.friends().then(Friends.all.set));

module.exports = Friends;
