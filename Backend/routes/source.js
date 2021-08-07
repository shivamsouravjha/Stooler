import express from 'express';
import SourceController from '../app/Controllers/sourceController';

const SourceApiRouter = express.Router();

SourceApiRouter.post('/add/:gid/:uid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.addSource(request);
});

// SourceApiRouter.post('/remove/:gid/:uid/:sid', (request, response) => {
//   const groupController = new SourceController(response);
//   groupController.removeSource(request);
// });

SourceApiRouter.post('/getcompany/:gid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getSources(request);
});

SourceApiRouter.post('/getcompanydetails/:sid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getSource(request);
});

SourceApiRouter.post('/:edit/sources/:sid/:uid', (request, response) => {
  const groupController = new SourceController(response);
  groupController.editSource(request);
});

SourceApiRouter.post('/approve/:uid/:type', (request, response) => {
  const groupController = new SourceController(response);
  groupController.getAprroval(request);
});

SourceApiRouter.post('/setapproval/:sid/:uid/:type', (request, response) => {
  const groupController = new SourceController(response);
  groupController.setApproval(request);
});

export default SourceApiRouter;
