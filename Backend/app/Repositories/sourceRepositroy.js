import GroupModel from "../Models/groupModel";
import UserModel from "../Models/userModel";
import SourceModel from "../Models/sourceModel";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}
import axios from 'axios';

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
            const found = await GroupModel.findById(obj,'-groupPayment').populate('sources').populate('groupOwner');
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
                console.log(sourceModel['price']*sourceModel['unitsPurchase'])
                var data = JSON.stringify({
                    "requestID":sourceInfo._id ,
                    "amount": {
                      "currency": "INR",
                      "amount": sourceModel['price']*sourceModel['unitsPurchase'],
                    },
                    "transferCode": "ATLAS_P2M_AUTH",
                    "debitAccountID": groupInfo['accountholderbankID'],
                    "creditAccountID": groupInfo['groupOwner']['accountholderbankID'],
                    "transferTime": Date.now(),
                    "remarks": "Creating group",
                    "attributes": {}
                  });
                  
                  var config = {
                    method: 'post',
                    url: 'https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers',
                    headers: { 
                      'accept': 'application/json; charset=utf-8', 
                      'Content-Type': 'application/json', 
                      'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                    },
                    data : data
                  };
                  
                var result = await axios(config)
                  .then(function (response) {
                    return response.data;
                });
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
            console.log(error)
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
