require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodayParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const _PORT = process.env.PORT;

app.use(morgan('dev'));

app.use(cors());

app.use(bodayParser.json());

const routes = require('./routes');

app.use('/', routes);

// 500 internal server error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 404) return next();
  res.status(500).json({
    err:  err,
    msg: '500 Internal Server Error',
    data: null,
  });
});

// 404 error handler
app.use((_req, res) => {
  res.status(404).json({
    err: null,
    msg: '404 Not Found',
    data: null,
  });
});


app.listen(_PORT, () => {
  console.log('Server Started');
});