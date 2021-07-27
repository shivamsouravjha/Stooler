import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
    }


    async addUserToGroup(args) {
        try {
            const {userId,amount,groupId}=args
            let verifyUserId =  await this.verifyUserDetail({_id:userId})
            let verifyGroupId =  (await this.getGroups({_id:groupId}))[0];
            if(!verifyUserId){
                throw (new Exceptions.ConflictException("No user found"));
            }
            if(!verifyGroupId){
                throw (new Exceptions.ConflictException("No Group found"));
            } 
            let accountInfo = await this.repository.addUserToGroup(args,verifyGroupId,verifyUserId);
            return {'message':'Group Joined','success':true}
        } catch (error) {
            throw error;
        }
    }



    async createSource(args) {
        try {
            await this.repository.createSource(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
            throw error;
        }
    }


    // async getGroups(args) {
    //     try {
    //         let groupInfo = await this.repository.findGroup(args);
    //         return groupInfo;
    //     } catch (error) {
    //         throw (new Exceptions.ValidationException("Error finding user details"));
    //     }
    // }


    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUser(args);
            return accountInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }


    async getGroups(args){
        try {
            let groupsInfo = await this.repository.findGroup(args);
            groupsInfo.sort(function(a,b){
                return (b.members).length-(a.members).length;
            })
            return groupsInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding groups"));
        }
    }
}