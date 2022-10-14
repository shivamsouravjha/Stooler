import express from 'express';
import { acceleratedmobilepageurl } from 'googleapis/build/src/apis/acceleratedmobilepageurl';
import AccountController from '../app/Controllers/accountController';

const AccountApiRouter = express.Router();


//Account Signup
AccountApiRouter.post('/account/signup', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

//Accout login
AccountApiRouter.post('/account/login/', (request, response) => {
  const accountController = new AccountController(response);
  accountController.loginAccount(request);
});

//Getting group detail of user
AccountApiRouter.post('/account/:uid', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getData(request);
});

//Getting user detail
AccountApiRouter.post('/account/data/:uid', (request, response) => {
  const accountController = new AccountController(response);
  accountController.verifyUsername({_id:request.params.uid});
});

export default AccountApiRouter;
