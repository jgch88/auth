import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import Authenticator from './Authenticator';
import UserService from './services/UserService';
import InMemoryRepository from './services/InMemoryRepository';
import SessionService from './services/SessionService';

const inMemoryRepository = new InMemoryRepository();
const userService = new UserService(inMemoryRepository);
const authenticator = new Authenticator(userService);
const sessionService = new SessionService();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));
app.post('/login', (req, res) => res.status(401).send());

app.post('/register', (req, res) => {
  res.sendStatus(200);
});

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
