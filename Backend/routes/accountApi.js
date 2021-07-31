import express from 'express';
import AccountController from '../app/Controllers/accountController';

const AccountApiRouter = express.Router();

AccountApiRouter.post('/account/signup', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

AccountApiRouter.post('/account/login/', (request, response) => {
  const accountController = new AccountController(response);
  accountController.loginAccount(request);
});

AccountApiRouter.post('/account/:uid', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getData(request);
});

// AccountApiRouter.post('/account/data/:uid', (request, response) => {
//   const accountController = new AccountController(response);
//   accountController.verifyUsername({_id:request.params.uid});
// });

export default AccountApiRouter;
