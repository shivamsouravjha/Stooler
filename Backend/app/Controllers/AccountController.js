import Controller from './Controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/Exceptions'
import Logger from '../Helpers/Logger';
import Validators from '../Validators/Validators';
import AccountService from '../Services/AccountService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new AccountService();
    }

    addaccount (request) {
        Logger.info("Adding account");
        try{
            let {value,error} = Validators.createAccount.validate(request.body);
            if(error){
                throw (new Exceptions.ValidationException(error.details[0].message));
            }     
            const addUser = this.service.addAccount(value);
            addUser.then(res => {
                this.sendResponse(res);
              })
              .catch (error => {
                this.handleException(error);
              }) 
        } catch (error) {
            Logger.error("Error at adding account",error);
            this.handleException(error)
        }
    }

    //  verifyUsername (request) {
    //     try{
    //         const exist =  this.service.verifyUsername(request);
    //         return exist
    //     } catch (error) {
    //         Logger.error("Error at finding account",error);
    //         this.handleException(error)
    //     }
    // }
}