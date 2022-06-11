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
  groupController.getGroups(request,true); ///true is being sent to find the groups,the user is a part of
});

//getting the groups a user can join
GroupApiRouter.post('/getjoingroups/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroups(request,false); //false is being sent to find groups user can join
});

//groupmembers of a group
GroupApiRouter.post('/groupmembers/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getMembers(request);
});


//transfering the ownership of the group and getting the groups owned by a user
GroupApiRouter.post('/transferownership/:context/:uid', (request, response) => { //context can be getgroups to get owned groups or transferownership to change owner
  const groupController = new GroupController(response); 
  groupController.getOwner(request);
});

//user to group join or leave
GroupApiRouter.post('/:context/:uid/', (request, response) => {
  const groupController = new GroupController(response); //context is join or leave
  groupController.userGroup(request);
});

//getting group details 
GroupApiRouter.post('/:groupId', (request, response) => {
  const groupController = new GroupController(response);
  groupController.getGroupDetail(request);
});

export default GroupApiRouter;
