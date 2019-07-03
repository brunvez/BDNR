const {
  setKey,
  getCache
} = require('./cacheService');

module.exports = (router) => {
  router
    .post('/caches', async (ctx, next) => {
      const {
        key,
        content,
        doNotExpire,
        timeToLive
      } = ctx.request.body;
      await setKey(key, content, doNotExpire ? null : timeToLive);
      ctx.noContent();
      next();
    })
    .get('/caches/:key', async (ctx, next) => {
      const { key } = ctx.params;
      ctx.response.body = await getCache(key);
      next();
    });
};