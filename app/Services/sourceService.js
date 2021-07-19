import GroupRepository from '../Database-interaction/GroupRepository';
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

    async deleteSource(args) {
        try {
            let sourceInfo = await this.repository.findSource(args.sid);
            if(!sourceInfo){
                throw (new Exceptions.NotFoundException("No such source found"));
            }            
            let groupInfo  = await this.repository.findGroup(sourceInfo.group); 
            if(!groupInfo){
                throw (new Exceptions.NotFoundException("No such group found"));
            }
            if(args.uid != groupInfo.groupOwner){
                sourceInfo.sellingPrice =args['sellingPrice'] ;
                sourceInfo.type = "REMOVE";
                sourceInfo.approved = false;
                await this.repository.editSource(sourceInfo);
                return {"message":"Sent to admin for removal"};
            } 
            sourceInfo['sellingPrice'] = args['sellingPrice'];
            groupInfo['fund'] += sourceInfo['sellingPrice']*sourceInfo['unitsPurchase'];
            if(sourceInfo['price']*sourceInfo['unitsPurchase'] > sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']){
                groupInfo['loss'] +=sourceInfo['price']*sourceInfo['unitsPurchase'] - sourceInfo['sellingPrice']*sourceInfo['unitsPurchase'];
                groupInfo.loss_deal.push(sourceInfo['price']*sourceInfo['unitsPurchase'] - sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']);
            }else{
                groupInfo.profit_deal.push(-sourceInfo['price']*sourceInfo['unitsPurchase'] + sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']);

            } 
            const reply =  await this.repository.deleteSource(groupInfo,sourceInfo);
            return reply;
        } catch (error) {
            throw error;
        }
    }
}