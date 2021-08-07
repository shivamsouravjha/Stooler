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
            let verifyUserId =  await this.verifyUserDetail({_id:userId})
            if(!verifyUserId){
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
                    verifyUserId.shares[0]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Stock'){
                    verifyUserId.shares[1]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Cryptocurrency'){
                    verifyUserId.shares[2]['amount']+=args.amount
                } if(verifyGroupId.genre == 'Currency Exchange'){
                    verifyUserId.shares[3]['amount']+=args.amount
                }
                if(args.amount < verifyGroupId.amount){
                    throw {'message':`Amount less than group minimum,add more ${verifyGroupId.amount - args.amount}`,'success':false};
                }
                verifyGroupId['fund']+=args.amount;
                verifyGroupId['totalsum']+=args.amount; 
                accountInfo = await this.repository.addUserToGroup(args,verifyGroupId,verifyUserId);
            }else{
                verifyGroupId =  (await this.getGroups(userId,{_id:groupId},true))[0];            
                if(!verifyGroupId){
                    throw (new Exceptions.ConflictException("No Group found"));
                } 
                const refund_amount = verifyGroupId.fund/verifyGroupId.members.length + verifyGroupId.loss/verifyGroupId.members.length;
                const transaction = await  this.repository.findTransaction({userId:verifyUserId['_id'],groupId:verifyGroupId['_id']});
               
                verifyUserId['funds'] += verifyGroupId.fund/verifyGroupId.members.length;
                verifyUserId['loss'] += verifyGroupId.loss/verifyGroupId.members.length;
                transaction['returned_amount'] = verifyGroupId.fund/verifyGroupId.members.length;
                transaction['result'] = transaction['returned_amount'] - transaction['deposited_amount'] - verifyGroupId.loss/verifyGroupId.members.length;
                transaction['type']= "LEFT";
                verifyGroupId['fund'] -= verifyGroupId.fund/verifyGroupId.members.length;
                verifyGroupId['loss'] -= verifyGroupId.loss/verifyGroupId.members.length;
                verifyGroupId.groupPayment.pull(transaction._id)
                
                if(transaction.deposited_amount>refund_amount){
                    transaction['due_amount']= transaction.deposited_amount-refund_amount;
                    verifyUserId['dues']+=transaction.deposited_amount-refund_amount;
                    transaction['type']= "DUES";
                    transaction['result'] =  "Unclear"
                    verifyGroupId.dues.push(transaction._id)
                }
                console.log(refund_amount,transaction,{userId:verifyUserId['_id'],groupId:verifyGroupId['_id']})

                accountInfo = await this.repository.removeUserFromGroup(args,verifyGroupId,verifyUserId);
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


    // async getGroups(args) {
    //     try {
    //         let groupInfo = await this.repository.findGroup(args);
    //         return groupInfo;
    //     } catch (error) {
    //         throw (new Exceptions.ValidationException("Error finding user details"));
    //     }
    // }


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
}