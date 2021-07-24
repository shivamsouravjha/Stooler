import GroupRepository from '../Repositories/GroupRepository';
import * as Exceptions from '../Exceptions/Exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new GroupRepository();
    }


    async addUserToGroup(args) {
        try {
            const {panNumber,aadhar,username,email,number}=args
            let verifyUsername =  await this.verifyUserDetail({panNumber,aadhar,username,email,number})
            if(verifyUsername){
                throw (new Exceptions.ConflictException("details already exist"));
            } 
            let hasedPassword = await bycrypt.hash(args.password,12)
            args.password = hasedPassword
            let accountInfo = await this.repository.addUser(args);
            return accountInfo
        } catch (error) {
        throw error;
        }
    }
    async createGroup(args) {
        try {
            let newGroup = await this.repository.addUserToGroup(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
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



}