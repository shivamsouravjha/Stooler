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


GroupApiRouter.post('/getjoingroups/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroups(request,false);
});

GroupApiRouter.post('/groupmembers/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getMembers(request);
});

GroupApiRouter.post('/transferownership/:context/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getOwner(request);
});

GroupApiRouter.post('/:context/:uid/', (request, response) => {
  const groupController = new GroupController(response);
  groupController.userGroup(request);
});

GroupApiRouter.post('/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroup(request);
});

export default GroupApiRouter;
