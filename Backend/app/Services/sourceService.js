import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
import SourceModel from "../Models/sourceModel";

export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
    }


    async deleteSource(args) {
        try {
            const groupInfo = await this.findGroup(args.groupId);
            const sourceInfo = await this.findSource(args.sourceId);
            const reply =  await this.repository.deleteSource(groupInfo,sourceInfo);
            return reply;
        } catch (error) {
            throw error;
        }
    }



    async createSource(args) {
        try {
            const groupInfo = await this.repository.findGroup(args.groupId);
            const accountInfo = await this.repository.findUser(args.userId);
            const suggestorName = accountInfo.name;
            const {name,details,targetPrice,duration,price,unitsPurchase,groupId}=args
            const approved = groupInfo.groupOwner == args.userId?true:false;
            const type = approved? "APPROVED":"ADD";
            const sourceModel = new SourceModel({
                name,details,targetPrice,duration,price,unitsPurchase,approved:approved,type:type,suggestorName,group:groupId
            })
            groupInfo['fund'] = groupInfo['fund']-price*unitsPurchase;
            if(groupInfo['fund']<0){
                throw {"message":`Source price more than current fund of group, exceeds by = ${price*unitsPurchase-groupInfo['fund']}`}
            }
            const response = await this.repository.createSource(sourceModel,groupInfo,approved);
            return response;
        } catch (error) {
            throw error;
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

    async getSourceDetails(args,bool,value){
        try {
            let sourceInfo = await this.repository.findSource(args);
            if(!bool)return {'source':sourceInfo};
            else{
                const promise = await this.editSourceDetails(value,{'unitsPurchase':sourceInfo.editsuggestion}); 
                return promise;
            }
        } catch (error) {
            throw error
        }
    }

    async editSourceDetails(value,args){
        try {
            let sourceInfo = await this.repository.findSource(value.sid);
            if(!sourceInfo){
                throw (new Exceptions.NotFoundException("No such source found"))
            }            
            let groupInfo  = await this.repository.findGroup(sourceInfo.group)
            if(!groupInfo){
                throw (new Exceptions.NotFoundException("No such group found"))
            } 
            groupInfo['fund'] = groupInfo['fund']-((args['unitsPurchase']-sourceInfo['unitsPurchase'])*sourceInfo['price']);
            if(groupInfo['fund']<0){
                throw (new Exceptions.ConflictException("Source funds less than group amount"));
            }
            if(groupInfo.groupOwner == value.uid){
                sourceInfo['unitsPurchase'] = args.unitsPurchase; 
                sourceInfo.type = "APPROVED";
                sourceInfo.approved= true;
                sourceInfo['editsuggestion']=0;
                await this.repository.editSource(groupInfo);
                await this.repository.editSource(sourceInfo);
                return {'success':true,message:"Source quantity edited"};
            }else{
                sourceInfo.type = "EDIT";
                sourceInfo['editsuggestion'] = args.unitsPurchase;
                await this.repository.editSource(sourceInfo);
                return {'success':true,message:"Edit suggestion sent to Group Owner"};
            }           
        } catch (error) {
            throw error;
        }
    }

    async getAprroval(uid,type){
        try {
            let sourceInfo = await this.repository.findGroupApprovalAdd(type);
            function checkUid(args) {
                return args.group.groupOwner==uid;
            };
            sourceInfo = sourceInfo.filter(checkUid);
            return {'groups':sourceInfo};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }
    
    async setAprrovalAdd(args){
        try {
            let sourceInfo = await this.repository.findSource(args.sid);
            let groupInfo  = await this.repository.findGroup(sourceInfo.group)
            groupInfo['fund'] = groupInfo['fund']-sourceInfo["price"]*sourceInfo['unitsPurchase'];
            if(groupInfo['fund']<0){
                throw {"message":`Source price more than current fund of group, exceeds by = ${sourceInfo["price"]*sourceInfo['unitsPurchase']-groupInfo['fund']}`}
            }
            let approved = args.set == "true"?true:false;
            if(approved){
                sourceInfo.approved = true;
                sourceInfo.type = "APPROVED";
                await this.repository.createSource(sourceInfo,groupInfo,approved);
                return {'success':true,"message":"Source Added to group"};
            }else{
                await this.repository.deleteSourceSet(sourceInfo);
                return {'success':true,"message":"Source Deleted"};
            }
            
        } catch (error) {
            console.log(error)
            throw (new Exceptions.ValidationException(error.message));
        }
    }
}