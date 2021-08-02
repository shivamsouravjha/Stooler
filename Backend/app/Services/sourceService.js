import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
    }


    async deleteSource(args) {
        try {
            const reply =  await this.repository.deleteSource(args);
            return reply;
        } catch (error) {
            throw error;
        }
    }



    async createSource(args) {
        try {
            await this.repository.createSource(args);
            return {message: 'Group Created!',success: true}
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding creating source"));
        }
    }


    async verifyUserDetail(args) {
        try {
            let accountInfo = await this.repository.findUser(args);
            return accountInfo;
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding user details"));
        }
    }


    async getSources(args){
        try {
            let sourceInfo = await this.repository.findGroup(args);
            return {'source':sourceInfo.sources};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }

    async getSourceDetails(args){
        try {
            let sourceInfo = await this.repository.findSource(args);
            return {'source':sourceInfo};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }

    async getAprroval(uid){
        try {
            let sourceInfo = await this.repository.findGroupApproval();
            function checkUid(args) {
                return args.group.groupOwner==uid;
            };
            sourceInfo = sourceInfo.filter(checkUid);
            return {'groups':sourceInfo};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }
    
    async setAprroval(args){
        try {
            console.log(args)
            let sourceInfo = await this.repository.findSource(args.sid);
            let groupInfo  = await this.repository.findGroup(sourceInfo.group)
            if(args.set){
                await this.repository.saveSource(groupInfo,sourceInfo);
            }else{
                await this.repository.deleteSourceSet(sourceInfo);
            }
            return {'success':true};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }
}