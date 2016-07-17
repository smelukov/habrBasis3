let entity = require('basis.entity');
let vkApi = require('app.vkApi');

let Audio = entity.createType('Audio', {
  artist: String,
  title: String,
  duration: Date
});

Audio.extendReader(data => data.duration *= 1000);
Audio.all.setSyncAction(() => vkApi.audio().then(Audio.all.set));

module.exports = Audio;
