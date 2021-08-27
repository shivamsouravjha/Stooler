import AccountRepository from '../Repositories/accountRepository.js';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }
    async addAccount(args) {
        try {
            const {panNumber,aadhar,username,email,number}=args
            let verifyUsername =  await this.verifyUsername({username:username})
            let verifyNumber =  await this.verifyUserDetail({number:number})
            let verifyEmail =  await this.verifyUserDetail({email:email})
            let verifyPanNumber =  await this.verifyUserDetail({panNumber:panNumber})
            let verifyAadhar =  await this.verifyUserDetail({aadhar:aadhar})
            if(verifyUsername){
                throw (new Exceptions.ConflictException("Username already exist"));
            } if(verifyNumber){
                throw (new Exceptions.ConflictException("NUmber already exist"));
            } if(verifyEmail){
                throw (new Exceptions.ConflictException("Email already exist"));
            } if(verifyPanNumber){
                throw (new Exceptions.ConflictException("Pannumber already exist"));
            } if(verifyAadhar){
                throw (new Exceptions.ConflictException("Aadhar already exist"));
            }  
            let hasedPassword = await bycrypt.hash(args.password,12)
            args.password = hasedPassword
            let accountInfo = await this.repository.addUser(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }
    async loginAccount(args) {
        try {
            const {username}=args
            let profile = await this.verifyUsername({username})
            if (!profile) {
                throw (new Exceptions.ConflictException("Username doesn't exist"));
            }
            let isvalidpassword = await bycrypt.compare(args.password,profile.password);
            if(!isvalidpassword) {
                throw (new Exceptions.ConflictException("Password doesn't match"));
            }
            let token = jwt.sign({userId:profile.id,email:profile.email},process.env.secretcode,{expiresIn:'7d'});
            return {message: 'Logged in!',success: true,userId:profile.id,email:profile.email,token:token}
        } catch (error) {
        throw error;
        }
    }


    async verifyUsername(args) {
        try {
            let accountInfo = await this.repository.findUserDetail(args);
            return accountInfo;
        } catch (error) {
        throw error;
        }
    }
    async findUsername(args) {
        try {
            let accountInfo = await this.repository.findUsername(args);
            return accountInfo;
        } catch (error) {
        throw error;
        }
    }
    async findUid (uid,args) {
        try {
            function clean(obj) {
                for (var propName in obj) {
                    if (obj[propName] === null || obj[propName] === '') {
                        delete obj[propName];
                    }
                }
                return obj
            }
            function search(obj) {
                for (var propName in obj) {
                    if (obj[propName] === null || obj[propName] === '') {
                        delete obj[propName];
                    }
                    for( var tick in args) {
                        if(obj[propName][tick] != args[tick]){
                            delete obj[propName];
                        }   
                    }
                }
                return obj
            }
            args = clean(args);
            let groupsInfo = await this.repository.findUid(uid);
            if(!Object.keys(args).length){
                return groupsInfo;
            }
            let groupsInfos = groupsInfo.groups;
            search(groupsInfos);            
            groupsInfos = groupsInfos.filter(function (el) {
                return el != null;
            });
            return groupsInfos;
        } catch(error){
            throw error;
        }
    }

    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUserDetail(args);
            return accountInfo;
        } catch (error) {
        throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }

    async transfermoney(user,body) {
        try {
            var userDetail = await this.verifyUserDetail({'_id':user})
            var data = JSON.stringify({
                "requestID":userDetail._id+Date.now() ,
                "amount": {
                  "currency": "INR",
                  "amount": body.sum
                },
                "transferCode": "ATLAS_P2M_AUTH",
                "debitAccountID": process.env.secretrichie,
                "creditAccountID": userDetail['accountholderbankID'],
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
            return {"status":"success"};
        } catch (error) {
            console.log(error)
        throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }
}