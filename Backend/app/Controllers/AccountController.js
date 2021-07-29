import Controller from './controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/exceptions'
import Logger from '../Helpers/Logger';
import Validators from '../Validators/validators';
import AccountService from '../Services/accountService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new AccountService();
    }

    addAccount (request) {
        // Logger.info("Adding account");
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
            // Logger.error("Error at adding account",error);
            this.handleException(error)
        }
    }

    loginAccount (request) {
      // Logger.info("Adding account");
      try{
          let {value,error} = Validators.loginAccount.validate(request.body);
          if(error){
              throw (new Exceptions.ValidationException(error.details[0].message));
          }     
          const addUser = this.service.loginAccount(value);
          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          // Logger.error("Error at logging in",error);
          this.handleException(error)
      }
  }



    getData (request) {
      try{
        const value = request.params.uid;
        const user = this.service.findUid(value);
        user.then(res => {
            this.sendResponse(res);
          })
          .catch (error => {
            this.handleException(error);
          }) 
    } catch (error) {
        // Logger.error("Error at logging in",error);
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