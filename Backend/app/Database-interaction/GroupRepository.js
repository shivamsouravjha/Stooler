import GroupModel from "../Models/GroupModel";
import UserModel from "../Models/UserModel";
import SMS from "../Database-interaction/AccountRepository";
import Transaction from "../Models/Transaction";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}

export default class GroupRepository {
    constructor() {
        this.SMS = new SMS();
      }
    async findUser (obj) {
        try {
            const found = await UserModel.findById(obj)
            return found;
        } catch (error) {
            throw error
        }
    }
    
    async editGroup (obj) {
        try {
            const found = await obj.save();
            return found;
        } catch (error) {
            throw error
        }
    }
    
    async findTransaction (obj) {
        try {
            const found = await Transaction.findOne(obj);
            return found;
        } catch (error) {
            throw error
        }
    }


    async findGroup (obj) {
        try {
            const found = await GroupModel.find(obj).populate('sources').populate('groupOwner');
            return found;
        } catch (error) {
            throw error
        }
    }
    
    async findOwnerGroup (obj) {
        try {
            const found = await GroupModel.find(obj);
            return found;
        } catch (error) {
            throw error
        }
    }
    
    async findGroupMembers (obj) {
        try {
            const found = await Transaction.find(obj).populate('userId').populate('groupId');
            return found;
        } catch (error) {
            throw error
        }
    }


    async addUserToGroup (args,verifyGroupId,verifyuserId) {
        try {
            args['type'] = 'ACTIVE';
            args['deposited_amount'] = args.amount;
            args['returned_amount'] = 0;
            args['due_amount'] = args.amount;
            delete args.amount;
            if(verifyuserId.funds < args.deposited_amount){
                throw {'message':'Insufficient funds','success':false};
            }
            verifyuserId.funds -= args.deposited_amount;
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyuserId._id);          
            verifyuserId.groups.push(verifyGroupId._id); 
            verifyuserId.transaction.push(newTransaction._id);
            await verifyuserId.save({ session: sess }); 

            await verifyGroupId.save({ session: sess }); 
            await sess.commitTransaction(); 

            return {'message':'Group Joined','success':true};

        } catch (error) {
            throw error;
        }
    }
    
    
    async removeUserFromGroup (args,verifyGroupId,verifyuserId) {
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await args.save(); 
            verifyGroupId.members.pull(verifyuserId._id);          
            verifyuserId.groups.pull(verifyGroupId._id); 
            await verifyuserId.save({ session: sess }); 
            await verifyGroupId.save({ session: sess }); 
            await sess.commitTransaction(); 
            if(!verifyGroupId.members.length){
                await verifyGroupId.remove();
            }

            return {'message':'Group Left','success':true};
        } catch (error) {
            throw error;
        }
    }


    async createGroup (obj) {
        const {groupName,description,genre,duration,amount,userId}=obj
        const groupModel = new GroupModel({groupName,
            description,
            genre,
            duration,
            amount,
            fund: amount,
            totalsum: amount,
            loss:0,
            profit_deal:[],
            loss_deal:[],
            members:[userId],
            groupOwner: userId,
            groupPayment:[],
            sources: [],
            dues:[],
        })
        let ownerDetails;
        try{
            ownerDetails = await UserModel.findById(userId);        //finding user and adding the amount to the portfolio
            if(genre == 'Gold/Silver'){
                ownerDetails.shares[0]['amount']+=amount
            } if(genre == 'Stock'){
                ownerDetails.shares[1]['amount']+=amount
            } if(genre == 'Cryptocurrency'){
                ownerDetails.shares[2]['amount']+=amount
            } if(genre == 'Currency Exchange'){
                ownerDetails.shares[3]['amount']+=amount
            }
            if(ownerDetails.funds < amount){
                throw {'message':'Insufficient funda','success':false};
            }
            ownerDetails.funds -= amount;
            const newTransaction = new Transaction({deposited_amount:amount,returned_amount:0,due_amount:amount,result:0,groupId:groupModel['_id'],userId:ownerDetails['_id'],type:"ACTIVE"})
            groupModel.groupPayment.push(newTransaction._id);
            ownerDetails.transaction.push(newTransaction._id);
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await groupModel.save({ session: sess }); 
            await newTransaction.save({ session: sess }); 
            ownerDetails.groups.push(groupModel._id); 
            await ownerDetails.save({ session: sess }); 
            await sess.commitTransaction(); 
        } catch (error) {
            throw error
        }
        return {"success":true};
    }
 
}
