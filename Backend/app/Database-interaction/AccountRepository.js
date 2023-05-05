import UserModel from "../Models/UserModel";
import jwt from 'jsonwebtoken';
 
export default class AccountRepository {
    async findUserDetail(obj){          //finding user detail
        try {
            const found = await UserModel.findOne(obj)
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async findUid (obj) {         //fetching the userdetail based on params and populate groups
        try {
            return await UserModel.findById(obj,'-password -_id').populate('groups');
        } catch (error) {
            return "error finding User"
        }
    }
    async findUsername(obj){      //fetching the userdetail based on params and populate transaction
        try {
            const found = await UserModel.findOne(obj).populate('transaction');
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async addUser(obj){
        const {name,panNumber,aadhar,username,email,password,number}=obj
        const userModel = new UserModel({name,
            panNumber,
            aadhar,
            username,
            email,
            password,
            number,
            funds:10000,
            loss:0,
            dues:0,
            groups:[],
            shares:[{genre:'Gold/Silver',amount:0},
            {genre:'Stock',amount:0},
            {genre:'Cryptocurrency',amount:0},           
            {genre:'Currency Exchange',amount:0},           
        ],
        })
        let userDetails;
        let token;
        try{
            userDetails =  await userModel.save();
            token = jwt.sign({userId:userDetails.id,email:userDetails.email},process.env.secretcode,{expiresIn:'7d'});
        } catch (error) {
            console.log(error)
            return "error at adding"
        }
        return {"success":true,"token":token,"userId":userDetails._id,email:userDetails.email};
    }

}