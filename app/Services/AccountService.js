import AccountRepository from '../Database-interaction/AccountRepository';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
            let accountInfo = await this.repository.findUsername(args);
            return accountInfo;
        } catch (error) {
        throw error;
        }
    }
}