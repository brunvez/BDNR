const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function setKey(key, value, timeToLive) {
  try {
    if (timeToLive) {
      await setAsync(key, value, 'EX', timeToLive);
    } else {
      await setAsync(key, value, 'NX');
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

/**
 * Kinda strange since "cache" is not
 * really "a thing" but whatever
 */
async function getCache(key) {
  return await getAsync(key);
}


module.exports = {
  setKey,
  getCache
};
