import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Disable static serving (avoid /app/public scans)
const middlewares = jsonServer.defaults({ static: undefined });

server.use(middlewares);

// Very permissive CORS for frontend to call this API
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
});
