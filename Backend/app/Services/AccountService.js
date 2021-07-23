import at from 'v-at';
import AccountRepository from '../Repositories/AccountRepository.js';
import * as Exceptions from '../Exceptions/Exceptions';
import bycrypt from 'bcryptjs';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }


    async addAccount(args) {
        try {
            let verifyUsername =  this.verifyUsername(args.username,args.panCard,args.email,args.number,args.aadhar)
            if(verifyUsername.username){
                throw (new Exceptions.ConflictException("details already exist"));
            }
            let hasedPassowrd = await this.hidepassword(args.password)
            args.password = hasedPassowrd
            let accountInfo = await this.repository.addUser(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }

    async hidepassword(args) {
        try{
            let hashed = await bycrypt.hash(args,12)
            return hashed
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



}