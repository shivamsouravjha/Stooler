import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import SourceModel from "../Models/sourceModel";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}

export default class SourceRepository {
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
            const found = await GroupModel.findById(obj,'-groupPayment').populate('sources');
            return found;
        } catch (error) {
            throw error
        }
    }

    async findGroupApprovalAdd (obj) {
        try {
            const found = await SourceModel.find({approved:false,type:obj}).populate('group');
            return found;
        } catch (error) {
            throw error
        }
    }

    async findSource (obj) {
        try {            
            const found = await SourceModel.findById(obj);
            return found;
        } catch (error) {
            throw error
        }
    }

    async addUserToGroup (args,verifyGroupId,verifyUserId) {
        try {
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
            return "Joined";
        } catch (error) {
            throw error
        }
    }


    async createSource(sourceModel,groupInfo,approved) {
        try{
            if(approved){    
                console.log(sourceModel,groupInfo,approved)            
                const sess = await mongoose.startSession();
                sess.startTransaction();
                await sourceModel.save({ session: sess });
                groupInfo.sources.push(sourceModel); 
                await groupInfo.save({ session: sess }); 
                await sess.commitTransaction(); 
                return {"success":true,"message":"Source Added"};
            }else{
                await sourceModel.save();
                return {"success":true,"message":"Source sent to Group Owner for approval"};
            }
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // async saveSource(groupInfo,sourceInfo){
    //     try{
    //         sourceInfo.approved = true;
    //         const sess = await mongoose.startSession();
    //         sess.startTransaction();
    //         await sourceInfo.save({ session: sess });
    //         groupInfo.sources.push(sourceInfo._id); 
    //         await groupInfo.save({ session: sess }); 
    //         await sess.commitTransaction(); 
    //         return true;
    //     }catch (error){
    //         throw error
    //     }
    // }
    async deleteSourceSet(obj){
        try{    
            await obj.remove();
        } catch (error){
            throw error;
        }
    }
    
    async editSource(obj){
        try{    
            await obj.save();
        } catch (error){
            throw error;
        }
    }
    async deleteSource (groupInfo,sourceInfo) {
        try{
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await sourceInfo.remove({session:sess});
            groupInfo.sources.pull(obj.sourceId); 
            await groupInfo.save({ session: sess }); 
            await sess.commitTransaction();; 
        } catch (error) {
            throw error
        }
        return {"success":true};
    }
}
