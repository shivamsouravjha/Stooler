import express from 'express';
import GroupCpntroller from '../app/Controllers/groupController';

const GroupApiRouter = express.Router();

GroupApiRouter.post('/create/:uid', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.createGroup(request);
});

GroupApiRouter.post('/join/:uid', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.joinGroup(request);
});

GroupApiRouter.post('/getgroups/:uid', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.getGroups(request,true);
});


GroupApiRouter.post('/getjoingroups/:uid', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.getGroups(request,false);
});


GroupApiRouter.post('/:groupId', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.getGroup(request);
});
export default GroupApiRouter;
