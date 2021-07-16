import express from 'express';
import GroupController from '../app/Controllers/groupController';

const GroupApiRouter = express.Router();

GroupApiRouter.post('/create/:uid', (request, response) => {
  const groupController = new GroupController(response);
  groupController.createGroup(request);
});

export default GroupApiRouter;
