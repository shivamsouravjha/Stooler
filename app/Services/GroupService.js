import GroupRepository from '../Database-interaction/GroupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AccountService{
    constructor() {
        this.repository = new GroupRepository();
    }


    async createGroup(args) {
        try {
            let newGroup = await this.repository.createGroup(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
            throw error;
        }
    }

    async getOwnGroup(args) {
        try {

            let groupsInfo = await this.repository.findGroup(args);
            return groupsInfo[0];
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }

    async getGroups(uid,args,objj){
        try {
            function clean(obj) {
                for (var propName in obj) {
                  if (obj[propName] === null || obj[propName] === '') {
                    delete obj[propName];
                  }
                }
                return obj
            }
            args = clean(args);   
            let groupsInfo = await this.repository.findGroup(args);
            function checkUid(uids) {
                return objj == uids.members.includes(uid);
            };
            groupsInfo = groupsInfo.filter(checkUid);           

            groupsInfo.sort(function(a,b){
                return (b.members).length-(a.members).length;
            })
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException(error.message));
        }
    }

}