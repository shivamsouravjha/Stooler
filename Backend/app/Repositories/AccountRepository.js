import UserModel from "../Models/userModel";
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default class AccountRepository {
    async findUserDetail(obj){
        try {
            const found = await UserModel.findOne(obj)
            return found;
        } catch (error) {
            return "error at finding"
        }
    }
    async findUid (obj) {
        try {
            return await UserModel.findById(obj,'-password -_id').populate('groups');
        } catch (error) {
            return "error finding User"
        }
    }
    async findUsername(obj){
        try {
            var found = await UserModel.findOne(obj).populate('transaction');
            var config = {
              method: 'get',
              url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${found['accountholderbankID']}/balance`,
              headers: { 
                'accept': 'application/json; charset=utf-8', 
                'X-Zeta-AuthToken': process.env.XZetaAuthToken,
              }
            };
            
            found['funds']= await axios(config)
            .then(function (response) {
              return response.data.balance;
            })        
            console.log(found)
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
            funds:0,
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
            var data = JSON.stringify({
            "ifiID": process.env.ifiID,
            "formID": userModel._id,
            "applicationType": "CREATE_ACCOUNT_HOLDER",
            "spoolID": "3deb5a70-311c-11ea-978f-2e728ce88125",
            "individualType": "REAL",
            "salutation": "",
            "firstName": name,
            "middleName": "",
            "lastName": "",
            "profilePicURL": "",
            "dob": {
                "year": 1992,
                "month": 10,
                "day": 25
            },
            "gender": "",
            "mothersMaidenName": "",
            "kycDetails": {
                "kycStatus": "Full",
                "kycStatusPostExpiry": "KYC_EXPIRED",
                "kycAttributes": {},
                "authData": {
                "PAN": panNumber,
                },
                "authType": "PAN"
            },
            "vectors": [],
            "pops": [],
            "customFields": {}
            });
            var config = {
            method: 'post',
            url: 'https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual',
            headers: { 
                'Content-Type': 'application/json', 
                'X-Zeta-AuthToken': process.env.XZetaAuthToken,
            },
            data : data
            };
            
            var reply = await  axios(config)
            .then(function (response) {
            return ((response.data));
            })
            var data = `{"accountHolderID": ${reply.individualID},  "name": ${username}, "phoneNumber": +91${number}}`;
            var config = {
            method: 'post',
            url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/${process.env.bundleId}/issueBundle`,
            headers: { 
                'accept': 'application/json; charset=utf-8', 
                'Content-Type': 'application/json; charset=utf-8', 
                'X-Zeta-AuthToken':  process.env.XZetaAuthToken
            },
            data : data
            };
            
            var replyforaccount =await axios(config)
            .then(function (response) {
            return (response.data);
            })
            userModel['accountholderbankID']=replyforaccount.accounts[0].accountID;
            userModel['accountholderbank']=reply.individualID;
            userDetails =  await userModel.save();
            token = jwt.sign({userId:userDetails.id,email:userDetails.email},process.env.secretcode,{expiresIn:'7d'});
        } catch (error) {
            console.log(error)
            return "error at adding"
        }
        return {"success":true,"token":token,"userId":userDetails._id,email:userDetails.email};
    }

}