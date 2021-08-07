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

  //   removeSource (request) {
  //     // Logger.info("Joining Group");
  //     try{              
  //         const value ={};
  //         value.uid = request.params.uid;
  //         value.gid = request.params.gid;
  //         value.sid = request.params.sid;
  //         const addUser = this.service.deleteSource(value);
  //         addUser.then(res => {
  //             this.sendResponse(res);
  //           })
  //           .catch (error => {
  //             this.handleException(error);
  //           }) 
  //     } catch (error) {
  //         // Logger.error("Error at joining error",error);
  //         this.handleException(error)
  //     }
  // }

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
        this.handleException(error);
      }
    }
    
    editSource (request) {
      try {
        const value={'sid':request.params.sid};
        value['uid'] = request.params.uid;
        let promise;
        // console.log(request.params)
        if(request.params.edit == "edit"){
           promise  = this.service.editSourceDetails(value,request.body);
        }else{
          // console.log("in delete")
          request.params['sellingPrice'] = request.body;
          promise  = this.service.deleteSource(request.params);
        }
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

    getAprroval (request) {
      try {
        const promise  = this.service.getAprroval(request.params.uid,request.params.type);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    }

    setApproval (request) {
      try {
        request.body['sid'] = request.params.sid;
        let promise;
        if(request.params.type == "ADD"){
          promise = this.service.setAprrovalAdd(request.body);
        }else if(request.params.type == "EDIT"){
          const value={'sid':request.params.sid};
          value['uid'] = request.params.uid;
          promise  =  this.service.getSourceDetails(request.params.sid,true,value)
        }else if(request.params.type == "REMOVE"){

        }
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