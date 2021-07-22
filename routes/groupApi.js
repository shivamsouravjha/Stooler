import express from 'express';
import GroupController from '../app/Controllers/groupController';

const GroupApiRouter = express.Router();

//creating a group 
GroupApiRouter.post('/create/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.createGroup(request);
});

//getting the group of a user
GroupApiRouter.post('/getgroups/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroups(request,true);
});

//getting the groups a user can join
GroupApiRouter.post('/getjoingroups/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroups(request,false);
});

//groupmembers of a group
GroupApiRouter.post('/groupmembers/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getMembers(request);
});


//transfering the ownership of the group
GroupApiRouter.post('/transferownership/:context/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getOwner(request);
});

//user to group join or leave
GroupApiRouter.post('/:context/:uid/', (request, response) => {
  const groupController = new GroupController(response);
  groupController.userGroup(request);
});

//getting group details 
GroupApiRouter.post('/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroup(request);
});

export default GroupApiRouter;
