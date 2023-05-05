import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import Validators from '../Validators/Validators';
import GroupService from '../Services/GroupService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new GroupService();
    }

    ////create a group 
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

    //fixing user to group relation :-leave or join
    userGroup (request) {
      try{
          let {value,error} = Validators.groupJoin.validate(request.body);
          if(error){
              throw (new Exceptions.ValidationException(error.details[0].message));
          }     
          value.userId = request.params.uid;
          value.context = request.params.context;
          const addUser = this.service.userToGroup(value);
          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          this.handleException({message:"Already a group member"})
      }
  }

  ///getting all groups
    getGroups (request,obj) {
      try {
        const uid = request.params.uid;
        const promise  = this.service.getGroups(uid,request.body,obj);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      }
    }


    //getting group details
    getGroupDetail (request) {
      try {
        let value = {_id:request.params.groupId};
        const promise  = this.service.getGroupDetail(value);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    } 
    
    //get members of a group
    getMembers (request) {
      try {
        let value = {groupId:request.params.groupId};
        const promise  = this.service.getGroupMembers(value);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch(error){
        this.handleException(error);
      } 
    }
    
    //get groups of an owner 
    getOwner (request) {
      try {
        let value = {groupOwner:request.params.uid};
        let promise;
        if(request.params.context == "getgroups"){
          promise  = this.service.getOwnedGroup(value);
        }else{
          value['_id'] =  request.body.gid;
          value['newOwner'] =  request.body.newOwner;
          promise  = this.service.transferOwnedGroup(value);
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