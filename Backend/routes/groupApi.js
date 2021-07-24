import express from 'express';
import GroupCpntroller from '../app/Controllers/GroupController';

const GroupApiRouter = express.Router();

GroupApiRouter.post('/create', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.createGroup(request);
});

GroupApiRouter.get('/join', (request, response) => {
  const groupController = new GroupCpntroller(response);
  groupController.joinGroup(request);
});
export default GroupApiRouter;
