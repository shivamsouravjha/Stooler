import express from 'express';
import AccountController from '../app/Controllers/AccountController';

const ApiRouter = express.Router();

ApiRouter.post('/account/signup', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addaccount(request);
});

export default ApiRouter;
