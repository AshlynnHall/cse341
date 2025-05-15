require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGO_URI);

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/', require('./routes'));

async function start() {
  try {
    await client.connect();
    app.locals.db = client.db('cse341');
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();