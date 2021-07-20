import Controller from './Controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/Exceptions'
import Logger from '../Helpers/Logger';
 import Validators from '../Validators/Validators';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
    //   this.service = new ImageService();
    }

    addaccount (request) {
        Logger.info("Adding account");
        try{
            let {value,error} = Validators.createAccount.validate(request.body);
            if(error){
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            console.log("works")
            throw "error"
        } catch (error) {
            Logger.error("Error at adding account",error);
            this.handleException(error)
        }
    }
}