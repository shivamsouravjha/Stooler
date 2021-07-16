import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import GroupService from '../Services/groupService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new GroupService();
    }
    createGroup (request) {
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
          this.handleException(error)
      }
  }

  getGroup (request) {
    try {
      let value = {_id:request.params.groupId};
      const promise  = this.service.getOwnGroup(value);
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