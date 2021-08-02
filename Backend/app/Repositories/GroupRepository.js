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


    async findGroup (obj) {
        try {
            const found = await GroupModel.find(obj).populate('sources');
            return found;
        } catch (error) {
            throw error
        }
    }


    async addUserToGroup (args,verifyGroupId,verifyUserId) {
        try {
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
                return {'message':`Amount less than group minimum,add more ${verifyGroupId.amount - args.amount}`,'success':false};
            }
            verifyGroupId['fund']+=args.amount;
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyUserId._id);
            verifyUserId.groups.push(verifyGroupId._id); 
            verifyUserId.transaction.push(newTransaction._id);
            await verifyGroupId.save({ session: sess }); 
            await verifyUserId.save({ session: sess }); 
            await sess.commitTransaction(); 
            return {'message':'Group Joined','success':true};
        } catch (error) {
            throw error
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
            profit:[],
            members:[userId],
            groupOwner: userId,
            groupPayment:[],
            sources: []
        })
        let ownerDetails;
        try{
            ownerDetails = await UserModel.findById(userId);
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await groupModel.save({ session: sess }); 
            ownerDetails.groups.push(groupModel._id); 
            await ownerDetails.save({ session: sess }); 
            await sess.commitTransaction(); 
        } catch (error) {
            throw error
        }
        return {"success":true};
    }

}
