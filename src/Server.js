import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Authenticator from './Authenticator';
import UserService from './services/UserService';
import InMemoryRepository from './services/InMemoryRepository';
import SessionService from './services/SessionService';
import IdGenerator from './utils/IdGenerator';

const inMemoryRepository = new InMemoryRepository();
const userService = new UserService(inMemoryRepository);
const authenticator = new Authenticator(userService);
const idGenerator = new IdGenerator();
const sessionService = new SessionService(idGenerator);

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));
app.post('/login', async (req, res) => {
  const loginAttempt = req.body;
  try {
    const loginVerified = await authenticator.verifyLogin(loginAttempt);
    if (loginVerified) {
      const newSessionId = sessionService.createSession(loginAttempt);
      res.cookie('sessionId', newSessionId);
      res.status(200).send();
    } else {
      res.status(401).send(); // wrong password
    }
  } catch (e) {
    res.status(404).send(); // user not found
  }
});

app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '/../views/register.html')));
app.post('/register', async (req, res) => {
  const newUser = req.body;
  await userService.registerUser(newUser);
  res.sendStatus(200);
});

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
