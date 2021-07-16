import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new GroupRepository();
    }


    async userToGroup(args) {
        try {        
            const {userId,groupId}=args
            let verifyuserId =  await this.verifyUserDetail(userId)
            if(!verifyuserId){
                throw (new Exceptions.ConflictException("No user found"));
            }
            let verifyGroupId;
            let accountInfo;
            if(args.context=="join"){
                verifyGroupId =  (await this.getGroups(userId,{_id:groupId},false))[0];            
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
                verifyGroupId =  (await this.getGroups(userId,{_id:groupId},true))[0];            
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


    async getGroups(uid,args,objj){
        try {
            function clean(obj) {
                for (var propName in obj) {
                  if (obj[propName] === null || obj[propName] === '') {
                    delete obj[propName];
                  }
                }
                return obj
            }
            args = clean(args);   
            let groupsInfo = await this.repository.findGroup(args);
            console.log(groupsInfo)
            function checkUid(uids) {
                return objj == uids.members.includes(uid);
            };
            groupsInfo = groupsInfo.filter(checkUid);           

            groupsInfo.sort(function(a,b){
                return (b.members).length-(a.members).length;
            })
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException(error.message));
        }
    }

    async getOwnGroup(args) {
        try {

            let groupsInfo = await this.repository.findGroup(args);
            return groupsInfo[0];
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }

    async getGroupMembers(args) {
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
            let groupsInfo = await this.repository.findOwnerGroup({_id:args._id,groupOwner:args.groupOwner});
            if(!groupsInfo.length)throw (new Exceptions.ValidationException("No group found"));
            if(groupsInfo[0].groupOwner == args.newOwner){
                throw (new Exceptions.ValidationException("Already a group member"));
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