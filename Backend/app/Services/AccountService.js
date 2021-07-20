import at from 'v-at';
import AccountRepository from '../Repositories/AccountRepository.js';
import * as Exceptions from '../Exceptions/Exceptions';

export default class AccountService{
    constructor() {
        this.repository = new AccountRepository();
    }


    async addAccount(args) {
        try {
            let verifyUsername = await this.verifyUsername(args.username,args.panCard,args.email,args.number,args.aadhar)
            if(verifyUsername.username){
                throw (new Exceptions.ConflictException("details already exist"));
            }
            let accountInfo = await this.repository.addUser(args);
            return accountInfo
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