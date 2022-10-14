import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import SourceModel from "../Models/sourceModel";
import MutualFundModel from "../Models/MutualFundModel";
import StockModel from "../Models/StockModel";
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

    async findGroupApprovalAdd () {
        try {
            const found = await SourceModel.find({approved:false}).populate('group');
            return found;
        } catch (error) {
            throw error
        }
    }

    async findSource (obj) {
        try {            
            const found = await SourceModel.findById(obj).populate('group');
            return found;
        } catch (error) {
            throw error
        }
    }

    async findMutualFundCatalgoue (obj) {
        try {            
            const found = await MutualFundModel.find(obj);
            return found;
        } catch (error) {
            throw error
        }
    }
    
    async bulkUpsertMutualFundData (obj) {
        try {            
            const found = await MutualFundModel.findOneAndUpdate({"tradingsymbol":obj['tradingsymbol']},obj);
            return found;
        } catch (error) {
            throw error
        }
    } 
    
    async bulkUpsertStocksData (obj) {
        try {            
            const objData = {symbol:obj['symbol'],token:obj['token'],name:obj['name'],expiry:obj['expiry'],strike:obj['strike'],lotsize:obj['lotsize'],instrumenttype:obj['instrumenttype'],exch_seg:obj['exch_seg'],tick_size:obj['tick_size']}

            const found = await StockModel.findOneAndUpdate({"symbol":obj['symbol']},objData,{upsert:true});
            console.log(objData,found)
            return found;
        } catch (error) {
            throw error
        }
    }

    async addUserToGroup (args,verifyGroupId,verifyuserId) {
        try {
            const newTransaction = new Transaction(args);
            const sess = await mongoose.startSession();
            sess.startTransaction();      
            await newTransaction.save(); 
            verifyGroupId.groupPayment.push(newTransaction._id); 
            verifyGroupId.members.push(verifyuserId._id);
            verifyuserId.groups.push(verifyGroupId._id); 
            verifyuserId.transaction.push(newTransaction._id); 
            await verifyGroupId.save({ session: sess }); 
            await verifyuserId.save({ session: sess }); 
            await sess.commitTransaction(); 
            return "Joined";
        } catch (error) {
            throw error
        }
    }


    async createSource(sourceModel,groupInfo,approved) {
        try{
            if(approved){
                sourceModel['sellPrice'] =0;    
                const sess = await mongoose.startSession();
                sess.startTransaction();
                await sourceModel.save({ session: sess });
                groupInfo.sources.push(sourceModel._id); 
                await groupInfo.save({ session: sess }); 
                await sess.commitTransaction(); 
                return {"success":true,"message":"Source Added"};
            }else{
                await sourceModel.save();
                return {"success":true,"message":"Source sent to Group Owner for approval"};
            }
            
        } catch (error) {
            throw error
        }
    }

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
            groupInfo.sources.pull(sourceInfo._id); 
            await groupInfo.save({ session: sess }); 
            await sess.commitTransaction();; 
        } catch (error) {
            throw error
        }
        return {"success":true,"message":"Source Deleted"};
    }
}
