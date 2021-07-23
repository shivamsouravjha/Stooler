import AccountRepository from '../Repositories/AccountRepository.js';
import * as Exceptions from '../Exceptions/Exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }


    async addAccount(args) {
        try {
            const {panNumber,aadhar,username,email,number}=args
            let verifyUsername = await this.verifyUsername({panNumber,aadhar,username,email,number})
            if(verifyUsername.username){

                throw (new Exceptions.ConflictException("details already exist"));
            }
            let hasedPassowrd = await bycrypt.hash(args,12)
            args.password = hasedPassowrd
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
            if (!profile.username) {
                throw (new Exceptions.ConflictException("Username doesn't exist"));
            }

            let isvalidpassword = await bycrypt.compare(args.password,profile.password);
            if(!isvalidpassword) {
                throw (new Exceptions.ConflictException("Password doesn't match"));
            }
            let token = jwt.sign({userid:profile.id,email:profile.email},process.env.secretcode,{expiresIn:'7d'});
            console.log(token)
            return {message: 'Logged in!',success: true,userid:profile.id,email:profile.email,token:token}
        } catch (error) {
        throw error;
        }
    }


    async verifyUsername(args) {
        try {
            let accountInfo = await this.repository.findUsername(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }

    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUserDetail(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }



}