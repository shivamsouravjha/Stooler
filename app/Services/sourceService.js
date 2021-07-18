import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
import SourceModel from "../Models/sourceModel";

export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
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
                name,details,targetPrice,duration,price,editPrice:price,unitsPurchase,approved:approved,type:type,suggestorName,group:groupId
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
}