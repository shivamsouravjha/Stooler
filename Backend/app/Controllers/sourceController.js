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
          const value ={};
          value.userId = request.params.uid;
          value.groupId = request.params.gid;
          value.sourceId = request.params.sid;
          const addUser = this.service.deleteSource(value);
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
        const value = request.params.sid;
        const promise  = this.service.getSourceDetails(value);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      }
    }
    
    editSource (request) {
      try {
        const value={'sid':request.params.sid};
        value['uid'] = request.params.uid;
        const promise  = this.service.editSourceDetails(value,request.body);
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
        let value = {_id:request.params.gid};
        const promise  = this.service.getSources(value);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    }

    getAprrovalAdd (request) {
      try {
        const promise  = this.service.getAprrovalAdd(request.params.uid);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    }

    setApprovalAdd (request) {
      try {
        request.body['sid'] = request.params.sid;
        const promise  = this.service.setAprrovalAdd(request.body);
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