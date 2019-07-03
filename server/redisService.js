const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getKeysAsync = promisify(client.keys).bind(client);
const mgetAsync = promisify(client.mget).bind(client);

const KEYS_PREFIX = 'BDNR_MESSSAGES';
const MESSAGES_CHANNEL = 'BDNR_MESSSAGES';

function addMessage(message) {
  const key = formatKey(new Date());
  const messageString = JSON.stringify(message);
  client.set(key, messageString);
  publishMessage(messageString);
  return { key };
}

function publishMessage(message) {
  client.publish(MESSAGES_CHANNEL, message);
}

function formatKey(date) {
  let hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  let min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  let sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;

  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;

  let day = date.getDate();
  day = (day < 10 ? '0' : '') + day;

  const milliseconds = date.getMilliseconds();

  return `${KEYS_PREFIX}:${year}:${month}:${day}:${hour}:${min}:${sec}:${milliseconds}`;
}

async function getMessages() {
  const keys = await getKeysAsync(`${KEYS_PREFIX}:*`);
  const messages = await mgetAsync(keys);
  return messages.map(JSON.parse);
}

function subscribeToMessages(callback) {
  const subscriber = redis.createClient();
  subscriber.on('message', (_channel, message) => {
    callback(JSON.parse(message))
  });
  subscriber.subscribe(MESSAGES_CHANNEL)
}

module.exports = {
  addMessage,
  getMessages,
  subscribeToMessages
};
