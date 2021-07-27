import Controller from './controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/exceptions'
import Logger from '../Helpers/Logger';
import Validators from '../Validators/validators';
import GroupService from '../Services/groupService';
export default class CompanyController extends Controller {
    constructor(response) {
      super(response);
      this.service = new GroupService();
    }

    addCompany (request) {
        // Logger.info("Creating Group");
        try{
            let {value,error} = Validators.groupCreate.validate(request.body);
            value.userId = request.params.uid;
            if(error){
                throw (new Exceptions.ValidationException(error.details[0].message));
            }     
            const addUser = this.service.createGroup(value);
            addUser.then(res => {
                this.sendResponse(res);
              })
              .catch (error => {
                this.handleException(error);
              }) 
        } catch (error) {
            // Logger.error("Error at creating group",error);
            this.handleException(error)
        }
    }

    removeCompany (request) {
      // Logger.info("Joining Group");
      try{
          let {value,error} = Validators.groupJoin.validate(request.body);
          if(error){
              throw (new Exceptions.ValidationException(error.details[0].message));
          }     
          value.userId = request.params.uid;
          const addUser = this.service.addUserToGroup(value);
          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          // Logger.error("Error at joining error",error);
          this.handleException(error)
      }
  }

    getCompany (request) {
      try {
        const promise  = this.service.getGroups();
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      }
    }

    getCompanies (request) {
      try {
        let value = {_id:request.params.groupId};
        const promise  = this.service.getGroups(value);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    }

}