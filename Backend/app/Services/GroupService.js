import GroupRepository from '../Database-interaction/GroupRepository';
import * as Exceptions from '../Exceptions/Exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new GroupRepository();
    }


    async userToGroup(args) {   //adding user to a group and removing them by increasing or decreasing funds
        try {        
            const {userId,groupId}=args
            let verifyuserId =  await this.verifyUserDetail(userId)
            if(!verifyuserId){
                throw (new Exceptions.ConflictException("No user found"));
            }
            let verifyGroupId;
            let accountInfo;
            if(args.context=="join"){
                verifyGroupId =  (await this.getGroups(userId,{_id:groupId},false))[0];      //getGroup architure will be followed,so false will give the  detail of group (if any)the user is not part yet      
                if(!verifyGroupId){
                    throw (new Exceptions.ConflictException("No Group found"));
                } 
                if(verifyGroupId.genre == 'Gold/Silver'){
                    verifyuserId.shares[0]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Stock'){
                    verifyuserId.shares[1]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Cryptocurrency'){
                    verifyuserId.shares[2]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Currency Exchange'){
                    verifyuserId.shares[3]['amount']+=args.amount
                }
                if(args.amount < verifyGroupId.amount){
                    throw {'message':`Amount less than group minimum,add more ${verifyGroupId.amount - args.amount}`,'success':false};
                }
                verifyGroupId['fund']+=args.amount;
                verifyGroupId['totalsum']+=args.amount; 
                accountInfo = await this.repository.addUserToGroup(args,verifyGroupId,verifyuserId);
            }else{
                verifyGroupId =  (await this.getGroups(userId,{_id:groupId},true))[0];      //getGroup architure will be followed,so true will give the  detail of group (if any)the user is  part of         
                if(!verifyGroupId){
                    throw (new Exceptions.ConflictException("No Group found"));
                } 
                if(verifyGroupId.members.length!=1){
                    if(JSON.stringify(verifyGroupId.groupOwner._id) == JSON.stringify(verifyuserId._id)){
                        throw (new Exceptions.ConflictException("You're the owner you can't quit without transfering role."));
                    }
                }
                const refund_amount = verifyGroupId.fund/verifyGroupId.members.length + verifyGroupId.loss/verifyGroupId.members.length;
                const transaction = await  this.repository.findTransaction({userId:verifyuserId['_id'],groupId:verifyGroupId['_id'],type:"ACTIVE"});
                verifyuserId['funds'] += verifyGroupId.fund/verifyGroupId.members.length;
                verifyuserId['loss'] += verifyGroupId.loss/verifyGroupId.members.length;
                transaction['returned_amount'] = verifyGroupId.fund/verifyGroupId.members.length;
                transaction['result'] = transaction['returned_amount'] - transaction['deposited_amount'];
                transaction['type']= "LEFT";
                verifyGroupId['fund'] -= verifyGroupId.fund/verifyGroupId.members.length;
                verifyGroupId['loss'] -= verifyGroupId.loss/verifyGroupId.members.length;
                verifyGroupId['totalsum'] -= transaction.deposited_amount;
                verifyGroupId.groupPayment.pull(transaction._id)
                transaction['due_amount']= 0;

                if(transaction.deposited_amount>refund_amount){
                    transaction['due_amount']= transaction.deposited_amount-refund_amount;
                    verifyuserId['dues']+=transaction.deposited_amount-refund_amount;
                    transaction['type']= "DUES";
                    transaction['result'] =  0;
                    verifyGroupId.dues.push(transaction._id)
                }
                accountInfo = await this.repository.removeUserFromGroup(transaction,verifyGroupId,verifyuserId);
            }
            return accountInfo;
        } catch (error) {
            throw error;
        }
    }



    async createGroup(args) {
        try {
            let newGroup = await this.repository.createGroup(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
            throw error;
        }
    }

    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUser(args);
            return accountInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }


    async getGroups(uid,args,objj){         //search the group that user is a part of ,or not a part of depending upon objj(true or false)
        try {
            function clean(obj) {
                for (var propName in obj) {
                  if (obj[propName] === null || obj[propName] === '') {
                    delete obj[propName];
                  }
                }
                return obj
            }
            args = clean(args);   //cleaning the body for empty parameters(as body can contain terms rquired for sorting group)
            let groupsInfo = await this.repository.findGroup(args);
            function checkUid(uids) {
                return objj == uids.members.includes(uid);//finding group ,user is a part-of/not a part of(depending on objj)
            };
            groupsInfo = groupsInfo.filter(checkUid);          

            groupsInfo.sort(function(a,b){
                return (b.members).length-(a.members).length;   //returing on decreasing group size
            })
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException(error.message));
        }
    }

    async getGroupDetail(args) { //get detail of a group
        try {
            let groupsInfo = await this.repository.findGroup(args);
            return groupsInfo[0];
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }

    async getGroupMembers(args) { //getting details of a memeber of groups
        try {
            args['type'] = "ACTIVE";
            let groupsInfo = await this.repository.findGroupMembers(args);
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }
    
    async getOwnedGroup (args) {
        try {
            let groupsInfo = await this.repository.findGroup(args);
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }

    async transferOwnedGroup (args) {
        try {
            let groupsInfo = await this.repository.findOwnerGroup({_id:args._id,groupOwner:args.groupOwner}); //finding the group whose ownership is changed
            if(!groupsInfo.length)throw (new Exceptions.ValidationException("No group found"));
            if(groupsInfo[0].groupOwner == args.newOwner){
                throw (new Exceptions.ValidationException("Already group leader"));
            }
            if(!groupsInfo[0].members.includes(args.newOwner)){
                throw (new Exceptions.ValidationException("Not a group member"));
            }
            groupsInfo[0].groupOwner = args.newOwner;
            await this.repository.editGroup(groupsInfo[0]);
            return {"message":"Ownership transferred Successfully!!"};
        } catch (error) {
            throw (new Exceptions.ValidationException(error.message));
        }
    }
}