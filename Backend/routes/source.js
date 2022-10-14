import express from 'express';
import SourceController from '../app/Controllers/sourceController';

const SourceApiRouter = express.Router();

// Adding source to group and permting for userid
SourceApiRouter.post('/add/:gid/:uid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.addSource(request);
});

//getting sources for a group (gid = group id)
SourceApiRouter.post('/getcompany/:gid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getSources(request);
});

//getting source details for a source
SourceApiRouter.post('/getcompanydetails/:sid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getSource(request);
});

// edit or add source by user
SourceApiRouter.post('/:edit/sources/:sid/:uid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.editSource(request);
});

//getting all the sources that need user approval
SourceApiRouter.post('/approve/:uid/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getAprroval(request);
});

//approving the source(sid) by user (uid)
SourceApiRouter.post('/setapproval/:sid/:uid/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.setApproval(request);
});

//getting mutual fund data
SourceApiRouter.post('/getcatalogue/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.mutualFundCatalogue(request);
});

SourceApiRouter.post('/uploaddata/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.uploadMutualFundData(request);
});

//getting stocks data
SourceApiRouter.post('/getcatalogueStocks/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.stocksCatalogue(request);
});

SourceApiRouter.post('/uploadStockdata/', (request, response) => {
  const groupController = new SourceController(response);
  groupController.uploadStocksData(request);
});
export default SourceApiRouter;
