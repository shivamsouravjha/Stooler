import UserModel from "../Models/userModel";
import jwt from 'jsonwebtoken';

export default class AccountRepository {
    async findUsername(obj){
        try {
            const found = await UserModel.findOne({username:obj.username,panCard:obj.panCard,email:obj.email,number:obj.number,aadhar:obj.aadhar})
            return found;
        } catch (error) {
            return "error at finding"
        }
}
    async addUser(obj){
        const {name,panNumber,aadhar,username,email,password,number}=obj
        const userModel = new UserModel({name,panNumber,aadhar,username,email,password,number})
        let userDetails;
        let token;
        try{
            userDetails =  await userModel.save();
            token = jwt.sign({userid:userDetails.id,email:userDetails.email},process.env.secretcode,{expiresIn:'7d'});
        } catch (error) {
            return "error at adding"
        }
        return {"success":true,"token":token};
    }

}