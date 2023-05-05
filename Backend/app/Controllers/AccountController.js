import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import Validators from '../Validators/Validators';
import AccountService from '../Services/AccountService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new AccountService();
    }

    addAccount (request) {                  //signup the user 
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
            this.handleException(error)
        }
    }

    loginAccount (request) {            //loggin in the account 
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
          this.handleException(error)
      }
  }



    getData (request) {                     //getting data for a UID(uid=userId)
      try{
        const value = request.params.uid;
        const user = this.service.findUid(value,request.body);
        user.then(res => {
            this.sendResponse(res);
          })
          .catch (error => {
            this.handleException(error);
          }) 
    } catch (error) {
        this.handleException(error)
    }
    }

    
      verifyUsername (request) {            //function named so because of multiple use across different function
          try{
              const exist =  this.service.verifyUsername(request); 
              exist.then(res => {
                this.sendResponse(res);
              })
              .catch (error => {
                this.handleException(error);
              }) 
          } catch (error) {
              this.handleException(error)
          }
      }
}