import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import SourceService from '../Services/sourceService';
export default class CompanyController extends Controller {
    constructor(response) {
      super(response);
      this.service = new SourceService();
    }
}