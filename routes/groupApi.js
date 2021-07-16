import express from 'express';
import GroupController from '../app/Controllers/groupController';

const GroupApiRouter = express.Router();

GroupApiRouter.post('/create/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.createGroup(request);
});


GroupApiRouter.post('/getgroups/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroups(request,true);
});


GroupApiRouter.post('/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroup(request);
});

export default GroupApiRouter;
