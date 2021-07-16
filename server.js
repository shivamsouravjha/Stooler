import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Routes from './routes/routes'
import Error from './app/Exceptions/error';
require('dotenv').config();

