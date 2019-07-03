const {
  addMessage,
  getMessages,
  subscribeToMessages
} = require('./redisService');

module.exports = (router, websockets) => {
  router
    .post('/messages', (ctx, next) => {
      const { message } = ctx.request.body;
      ctx.response.body = addMessage(message);
      next();
    })
    .get('/messages', async (ctx, next) => {
      ctx.response.body = await getMessages();
      next();
    });

  websockets.get('/messages', async (ctx, next) => {
    try {
      subscribeToMessages((message) => {
        ctx.websocket.send(JSON.stringify(message));
      });
    } catch (_e) {
      next();
    }
  });
};