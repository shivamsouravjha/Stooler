import Controller from './controller';
import at from 'v-at'
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import SourceService from '../Services/sourceService';
export default class CompanyController extends Controller {
    constructor(response) {
      super(response);
      this.service = new SourceService();
    }

    addSource (request) {
        // Logger.info("Creating Group");
        try{
            let {value,error} = Validators.createSource.validate(request.body);
            value.userId = request.params.uid;
            value.groupId = request.params.gid;
            if(error){
                throw (new Exceptions.ValidationException(error.details[0].message));
            }     
            const addUser = this.service.createSource(value);
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

    removeSource (request) {
      // Logger.info("Joining Group");
      try{              
          console.log(request.params)
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

    getSource (request) {
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

    getSources (request) {
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