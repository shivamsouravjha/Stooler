import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import SourceService from '../Services/sourceService';
export default class CompanyController extends Controller {
    constructor(response) {
      super(response);
      this.service = new SourceService();
    }

    
    addSource (request) {
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
          this.handleException(error)
      }
  }

  
  getSource (request) {
    try {
      const value = request.params.sid;
      const promise  = this.service.getSourceDetails(value,false,null);

      promise.then(res=>{
        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      console.log(error)
      this.handleException(error);
    }
  }
  
}