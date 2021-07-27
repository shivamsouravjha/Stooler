import express from 'express';
import CompanyController from '../app/Controllers/companyController';

const SourceApiRouter = express.Router();

SourceApiRouter.post('/add/:gid', (request, response) => {
  const groupController = new CompanyController(response);
  groupController.addCompany(request);
});

SourceApiRouter.post('/remove/:gid', (request, response) => {
  const groupController = new CompanyController(response);
  groupController.removeCompany(request);
});

SourceApiRouter.get('/getcompany/:gid', (request, response) => {
  const groupController = new CompanyController(response);
  groupController.getCompanies(request);
});

SourceApiRouter.get('/getcompanydetails/:groupId', (request, response) => {
  const groupController = new CompanyController(response);
  groupController.getCompany(request);
});

export default SourceApiRouter;
