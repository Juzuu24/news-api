import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// ⛔ disable the default /public static dir that keeps crashing
const middlewares = jsonServer.defaults({ static: undefined });

server.use(middlewares);

// (CORS explicit, just in case)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server running on ${port}`);
});
