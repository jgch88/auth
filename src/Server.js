const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '/../views/login.html')));

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));
