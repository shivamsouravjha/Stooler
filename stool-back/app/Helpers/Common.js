import Hash from './Hash';
import * as constants from '../constants/constants';

const request = require('request');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const salt = '@123QWERTyuiop';

export function parseJson (str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

export function hasAdminPermission ({ permissions, actor, permissionToCheck }) {
  if (!permissionToCheck) {
    // TODO: Add exception
  }

  const hasPermission = (permissions || []).find(permission => permission.name === permissionToCheck);
  const isInternal = (permissions || []).find(
    permission => permission.name === constants.PERMISSIONS.INTERNAL_PERMISSION
  );

  return (hasPermission && actor.type === constants.USER_TYPE.ADMIN) || isInternal;
}

export function jwtAuthVerifyV2 (token, callback) {
  if (!token) {
    callback(null, { error: 'Please provide token' });
  }
  const options = {
    method: 'GET',
    url: `${process.env.ACCOUNTS_URL}/api/users/internal/v2/verify-token?detail=true`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  };

  request(options, (error, response, body) => {
    if (!error) {
      const responseBody = JSON.parse(body).data;
      callback(null, responseBody);
    } else {
      console.log(error);
      callback({ code: error.code }, null);
    }
  });
}

export function RandomPassword (length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function createFoldersIfDoesntExist () {
  let dir = path.join(process.env.HOME, 'ensologic', 'filesync');
  if (process.enso.tempdir.dir) {
    dir = process.enso.tempdir.dir;
  } else {
    process.enso.tempdir.dir = dir;
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createCypherText (cipherText, encryptedIdLength) {
  let encryptedText = cipherText;
  encryptedText += crypto
    .randomBytes(encryptedIdLength)
    .toString('hex')
    .toUpperCase();
  return encryptedText;
}

export function generateRandomSkuID (accountParams) {
  const { accountCountryCode, accountCode } = accountParams;
  const cipherText = `${accountCountryCode + accountCode}9`;
  const skuId = createCypherText(cipherText, 14);
  return skuId;
}

function formatDate (dateToFormat) {
  let dd = dateToFormat.getDate();
  let mm = dateToFormat.getMonth() + 1; // January is 0!
  const yyyy = dateToFormat.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const newDate = `${dd}/${mm}/${yyyy}`;
  return newDate;
}
function getDifferenceBetweenDates (date1, date2) {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

export function encryptText (userAccountId) {
  const textToEncrypt = `${userAccountId}%%%${new Date()}`;
  const cipher = crypto.createCipher(algorithm, salt);
  let encryptedText = cipher.update(textToEncrypt, 'utf8', 'hex');
  encryptedText += cipher.final('hex');
  return encryptedText;
}

export function decryptText (encryptedText) {
  try {
    const decipher = crypto.createDecipher(algorithm, salt);
    let decipherText = decipher.update(encryptedText, 'hex', 'utf8');
    decipherText += decipher.final('utf8');
    if (decipherText.split('%%%')[0]) {
      return { account_id: decipherText.split('%%%')[0], token: encryptedText };
    }
    // if (decipherText.split('%%%')[1]) {
    //   const encryptedDate = formatDate(new Date(decipherText.split('%%%')[1]));
    //   const currentDate = formatDate(new Date());
    //   const getDaysDiffenrence = getDifferenceBetweenDates(currentDate, encryptedDate);
    //   if (getDaysDiffenrence > 30 && getDaysDiffenrence < 0) {
    //     return false;
    //   }

    //   return true;
    // }
    return false;
  } catch (error) {
    return false;
  }
}

export function oAuthVerifyV3 (token, callback) {
  const options = {
    method: 'POST',
    url: `${process.env.ACCOUNTS_URL}/api/accounts/internal/oauth/v1/verify-user-oauth`,
    body: JSON.stringify({ type: 'PERMISSIONS', detail: true }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        try {
          if (response.statusCode !== 200) {
            reject({ code: 401, message: 'Please provide valid token' });
          }
          const responseBody = JSON.parse(body);
          resolve(responseBody);
        } catch (error) {
          console.log('Something with accessing Auth Service went wrong');
          console.log(error);
          reject({ code: 500, message: 'Something with accessing Auth Service went wrong' });
        }
      } else {
        reject({ code: error.code });
      }
    });
  });
}

export async function jwtAuthVerifyV3 (token) {
  const options = {
    method: 'POST',
    url: `${process.env.ACCOUNTS_URL}/api/accounts/user/v1/get/`,
    body: JSON.stringify({ type: 'PERMISSIONS', detail: true }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        try {
          if (response.statusCode !== 200) {
            reject({ code: 401, message: 'Please provide valid token' });
          }
          const responseBody = JSON.parse(body).data;
          resolve(responseBody);
        } catch (error) {
          console.log('Something with accessing Auth Service went wrong');
          console.log(error);
          reject({ code: 500, message: 'Something with accessing Auth Service went wrong' });
        }
      } else {
        reject({ code: error.code });
      }
    });
  });
}

export async function jwtAuthVerifyUniversal (headers, body) {
  console.log("body", body);
  console.log("headers", headers)
  const options = {
    method: 'POST',
    url: `${process.env.ACCOUNTS_URL}/api/accounts/user/v2/auth`,
    body: JSON.stringify(body),
    headers
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        try {
          if (response.statusCode !== 200) {
            reject({ code: 401, message: 'Please provide valid token' });
          }
          const responseBody = JSON.parse(body).data;
          resolve(responseBody);
        } catch (error) {
          console.log('Something with accessing Auth Service went wrong');
          console.log(error);
          reject({ code: 500, message: 'Something with accessing Auth Service went wrong' });
        }
      } else {
        reject({ code: error.code });
      }
    });
  });
}

export function verifyJwtToken (token) {
  return new Promise(resolve => {
    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
      if (!err) {
        const email = Hash.decrypt(decoded.email);
        resolve(email);
      } else {
        console.log(err);
        resolve(null);
      }
    });
  });
}

export async function jwtAuthVerifyCustomer (token) {
  const options = {
    method: 'GET',

    url: `${process.env.ACCOUNTS_URL}/api/accounts/user/v1/getcustomer/`,
    body: JSON.stringify({ detail: false }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        try {
          if (response.statusCode !== 200) {
            reject({ code: 401, message: 'Please provide valid token' });
          }
          const responseBody = JSON.parse(body).data;
          resolve(responseBody);
        } catch (error) {
          console.log('Something with accessing Auth Service went wrong');
          console.log(error);

          reject({ code: 500, message: 'Something with accessing Auth Service went wrong' });
        }
      } else {
        reject({ code: error.code });
      }
    });
  });
}

export async function triggerMessage (args) {
  const options = {
    method: 'POST',

    url: `${process.env.MISC_URL}/api/internal/v1/message/send`,
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        try {
          const responseBody = JSON.parse(body).data;
          resolve(responseBody);
        } catch (error) {
          console.log(error);

          reject({ code: 500, message: error });
        }
      } else {
        reject({ code: error.code });
      }
    });
  });
}
