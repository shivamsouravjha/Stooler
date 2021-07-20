/**
 * Logger helper
 */
import fs from 'fs';
import path from 'path';

import rfs from 'rotating-file-stream';

const { createLogger, format, transports } = require('winston');

const { combine, errors, json } = format;

const logFile = process.env.LOG_FILE || 'app';

// logs middleware
const logDirectory = path.join(__dirname, '../../storage/logs');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
rfs('app.log', {
  size: '10M',
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
});

const logTransports = [new (transports.File)({ filename: path.join(`${logDirectory}/${logFile}.log`) })];

if (process.env.APP_ENV === 'development') {
  console.log('Enabling development log.................');
  logTransports.push(new transports.Console({
    format: format.simple(),
  }));
} else if (process.env.APP_ENV === 'staging') {
  console.log('Enabling staging log.................');
  logTransports.push(new transports.Console({
    format: format.simple()
  }));
} else if (process.env.APP_ENV === 'production') {
  console.log('Enabling production log.................');
  logTransports.push(new transports.Console({
    format: format.simple()
  }));
}

const Logger = createLogger({
  format: combine(
    format.timestamp(),
    format.splat(),
    errors({ stack: true }),
    json(),
  ),
  transports: logTransports,
});

module.exports = Logger;
