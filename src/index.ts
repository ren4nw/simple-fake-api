import jsonServer from 'json-server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { auth, delay } from './middlewates';
import routes from './routes';

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router(routes());
const middlewares = jsonServer.defaults();

server.use(delay);

server.use(jsonServer.bodyParser);

server.post('/login', async (request, response) => {
  
  const { username, password } = request.body;
  
  if (!username || !password) {
    return response.status(400).json();
  }

  const defaultUsername = process.env.DEFAULT_USER;
  const defaultPassword = process.env.DEFAULT_PASSWORD;

  if (username == defaultUsername && password == defaultPassword) {
    const token = await jwt.sign({
      user: 'fake',
      exp: (Date.now() + 3600) * 2,
    }, String(process.env.SECRET));
  
    return response.json({ token: `Bearer ${token}` });
  }
  
  return response.status(401).json();
});

server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(3000);