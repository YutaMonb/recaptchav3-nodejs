const express = require('express');
const app = express();
const request = require('request');
const SITEKEY = process.env.SITEKEY;
const SECRETKEY = process.env.SECRETKEY;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', { SITEKEY });
});

app.get('/api/get', (req, res) => {
  if (!req.query.token) return res.sendStatus(400);

  const options = {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    headers: {
      'Content-Type': 'application/json'
    },
    form: {
      secret: SECRETKEY,
      response: req.query.token
    }
  };
  request.post(options, (error, response, body) => {
    if (error) return console.error(error);

    body = JSON.parse(body);
    console.log(body);
    if (!body.success) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

app.listen(8000);
