import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import SourceModel from "../Models/sourceModel";
import Transaction from "../Models/transaction";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}


export default class GroupRepository {
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
