const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/api/v1/memes', require('./routes/memes'));
app.use('/api/v1/farts', require('./routes/farts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
