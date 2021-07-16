import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Routes from './routes/routes'
import Error from './app/Exceptions/error';
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
}); 