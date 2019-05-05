import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import Authenticator from './Authenticator';
import UserService from './services/UserService';
import InMemoryRepository from './services/InMemoryRepository';
import SessionService from './services/SessionService';

const inMemoryRepository = new InMemoryRepository();
const userService = new UserService(inMemoryRepository);
// eslint-disable-next-line no-unused-vars
const authenticator = new Authenticator(userService);
// eslint-disable-next-line no-unused-vars
const sessionService = new SessionService();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));
app.post('/login', (req, res) => res.status(401).send());

app.post('/register', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const newUser = req.body;

  // TODO: validate new user
  // TODO: catch duplicate users
  res.sendStatus(200);
});

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
