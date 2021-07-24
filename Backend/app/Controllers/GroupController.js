import Controller from './Controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/Exceptions'
import Logger from '../Helpers/Logger';
import Validators from '../Validators/Validators';
import GroupService from '../Services/GroupService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new GroupService();
    }

    createGroup (request) {
        Logger.info("Creating Group");
        try{
            let {value,error} = Validators.groupCreate.validate(request.body);
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

    joinGroup (request) {
      Logger.info("Joining Group");
      try{
          let {value,error} = Validators.groupJoin.validate(request.body);
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