const Koa = require('koa');
const Router = require('koa-router');

const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const websockify = require('koa-websocket');
const cors = require('@koa/cors');

const messaging = require('./messaging');
const cache = require('./cache');

const app = websockify(new Koa());
app.use(logger());
app.use(bodyParser());
app.use(respond());
app.use(cors());

const router = new Router();
const websockets = new Router();

messaging(router, websockets);
cache(router, websockets);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.ws.use(websockets.routes());

app.listen(5000);
