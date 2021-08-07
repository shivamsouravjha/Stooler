import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import SourceModel from "../Models/sourceModel";
import Transaction from "../Models/transaction";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}

export default class GroupRepository {
    async findUser (obj) {
        try {
            const found = await UserModel.findById(obj)
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


    async addUserToGroup (args,verifyGroupId,verifyUserId) {
        try {
            args['type'] = 'ACTIVE';
            args['deposited_amount'] = args.amount;
            args['returned_amount'] = 0;
            args['due_amount'] = 0;
            delete args.amount;
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyUserId._id);          
            verifyUserId.groups.push(verifyGroupId._id); 
            verifyUserId.transaction.push(newTransaction._id);
            await verifyUserId.save({ session: sess }); 

            await verifyGroupId.save({ session: sess }); 

            await sess.commitTransaction(); 
            console.log("Pass")
            return {'message':'Group Joined','success':true};
        } catch (error) {
            throw error;
        }
    }
    
    
    async removeUserFromGroup (args,verifyGroupId,verifyUserId) {
        try {
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyUserId._id);          
            verifyUserId.groups.push(verifyGroupId._id); 
            verifyUserId.transaction.push(newTransaction._id);
            await verifyUserId.save({ session: sess }); 

            await verifyGroupId.save({ session: sess }); 

            await sess.commitTransaction(); 
            console.log("Pass")
            return {'message':'Group Joined','success':true};
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
            ownerDetails = await UserModel.findById(userId);
            const newTransaction = new Transaction({deposited_amount:amount,returned_amount:0,due_amount:amount,result:0,groupId:groupModel['_id'],userId:ownerDetails['_id'],type:"ACTIVE"})
            groupModel.groupPayment.push(ownerDetails._id);
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
