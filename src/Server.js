import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Authenticator from './Authenticator';
import UserService from './services/UserService';
import InMemoryRepository from './services/InMemoryRepository';
import SessionService from './services/SessionService';

const inMemoryRepository = new InMemoryRepository();
const userService = new UserService(inMemoryRepository);
const authenticator = new Authenticator(userService);
// eslint-disable-next-line no-unused-vars
const sessionService = new SessionService();

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
    await authenticator.verifyLogin(loginAttempt);
    res.cookie('username', loginAttempt.username);
    res.status(200).send();
  } catch (e) {
    res.status(401).send();
  }
});

app.post('/register', async (req, res) => {
  const newUser = req.body;
  await userService.registerUser(newUser);
  res.sendStatus(200);
});

// cookie experiment on setting, testing for cookies
/*
app.get('/cookie', (req, res) => {
  // send cookie if it exists
  // the first time, req.cookies is an [Object: null prototype]{}
  // subsequently, it displays the cookie
  if (req.cookies) {
    console.log(req.cookies);
  }
  res.cookie('cookieName', 'cookieValue');
  res.sendStatus(200);
});
*/

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
