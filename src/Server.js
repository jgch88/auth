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

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));
app.post('/login', async (req, res) => {
  const loginAttempt = req.body;
  try {
    const loginVerified = await authenticator.verifyLogin(loginAttempt);
    if (loginVerified) {
      const newSessionId = sessionService.createSession(loginAttempt);
      res.cookie('sessionId', newSessionId);
      res.json({ loginStatus: 'Success' });
    } else {
      // wrong password
      res.json({ loginStatus: 'Username or password invalid.' });
    }
  } catch (e) {
    // user not found
    res.json({ loginStatus: 'Username or password invalid.' });
  }
});

app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '/../views/register.html')));
app.post('/register', async (req, res) => {
  const newUser = req.body;
  try {
    await userService.registerUser(newUser);
    res.json({ registrationSucceeded: true });
  } catch (e) {
    res.json({ registrationSucceeded: false });
  }
});

app.get('/protected', (req, res) => {
  try {
    const { sessionId } = req.cookies;
    const username = sessionService.verifySession(sessionId);
    res.status(200).send(`Hello ${username}`);
  } catch (e) {
    res.status(401).send();
  }
});

app.get('/logout', (req, res) => {
  try {
    const { sessionId } = req.cookies;
    sessionService.verifySession(sessionId);
    sessionService.removeSession(sessionId);
    res.status(200).send('Logout successful');
  } catch (e) {
    res.status(200).send('No user logged in.'); // for sessionIds that don't exist
  }
});

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
