const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));
app.post('/login', (req, res) => res.status(401).send());

app.post('/register', (req, res) => {
  res.send(200);
});

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
