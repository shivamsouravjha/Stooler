import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import Validators from '../Validators/Validators';
import SourceService from '../Services/sourceService';
export default class CompanyController extends Controller {
    constructor(response) {
      super(response);
      this.service = new SourceService();
    }

    //adding source to a group
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

  //getting source of a group
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
  
//edit source of a group
  editSource (request) {
    try {
      const value={'sid':request.params.sid};
      value['uid'] = request.params.uid;
      let promise;
      if(request.params.edit == "edit"){
         promise  = this.service.editSourceDetails(value,request.body);
      }else{
        request.params['sellingPrice'] = request.body.sellingPrice;
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

  //get sources of a group
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

  //get those groups who need approval
  getAprroval (request) {
    try {
      const promise  = this.service.getAprroval(request.params.uid);
      promise.then(res=>{
        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      this.handleException(error);
    } 
  }

  //approve the group 
  setApproval (request) {
    try {
      let promise;
      promise = this.service.setApproval(request);
      promise.then(res=>{
        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      this.handleException(error);
    } 
  }
  
  mutualFundCatalogue (request) {
    try {
      let promise;
      promise = this.service.getCatalogue(request.body);
      promise.then(res=>{
        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      this.handleException(error);
    } 
  }
  
  stocksCatalogue (request) {
    try {
      let promise;
      promise = this.service.getCatalogue(request.body);
      promise.then(res=>{
        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      this.handleException(error);
    } 
  }

  uploadMutualFundData (request) {
    try {
      let promise;
      promise = this.service.updateMutualFunds(request);
      promise.then(res=>{

        this.sendResponse(res);
      }).catch(error =>{
        this.handleException(error);
      })
    } catch(error){
      this.handleException(error);
    } 
  }
  uploadStocksData (request) {
    try {
      let promise;
      promise = this.service.updateStocks(request);
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