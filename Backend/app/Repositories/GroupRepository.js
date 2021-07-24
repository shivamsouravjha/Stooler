import GroupModel from "../Models/GroupModel";
import UserModel from "../Models/UserModel";
import mongoose from 'mongoose';
mongoose.models = {GroupModel,UserModel}

export default class GroupRepository {
    async findUserDetail (obj) {
        try {
            const found = await GroupModel.findOne({username:obj.username,panCard:obj.panCard,email:obj.email,number:obj.number,aadhar:obj.aadhar})
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async addUserToGroup (obj) {
        const {groupName,description,genre,duration,amount,userId}=obj
        const groupModel = new GroupModel({groupName,
            description,
            genre,
            duration,
            amount,
            profit:[],
            members:[userId],
            groupOwner: userId
        })
        let ownerDetails;
        try{
            ownerDetails = await UserModel.findById(userId);
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await groupModel.save({ session: sess }); 
            ownerDetails.groups.push(groupModel.id); 
            await ownerDetails.save({ session: sess }); 
            await sess.commitTransaction(); 
        } catch (error) {
            return "error at adding"
        }
        return {"success":true};
    }

}
