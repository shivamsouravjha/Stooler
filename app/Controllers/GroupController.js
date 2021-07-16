import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import GroupService from '../Services/groupService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new GroupService();
    }
}