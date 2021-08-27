import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
import SourceModel from "../Models/sourceModel";
import axios from 'axios';

export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
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
            if(args.uid != groupInfo.groupOwner._id){
                sourceInfo.sellingPrice =args['sellingPrice'] ;
                sourceInfo.type = "REMOVE";
                sourceInfo.approved = false;
                await this.repository.editSource(sourceInfo);
                return {"message":"Sent to admin for removal"};
            } 
            sourceInfo['sellingPrice'] = args['sellingPrice'];
            var config = {
                method: 'get',
                url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${groupInfo['accountholderbankID']}/balance`,
                headers: { 
                  'accept': 'application/json; charset=utf-8', 
                  'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                }
              };
              
            groupInfo['fund']= await axios(config)
              .then(function (response) {
                return response.data.balance;
            })   
            var netbalance = sourceInfo['sellingPrice']*sourceInfo['unitsPurchase'];
            groupInfo['fund']+=netbalance;
            if(sourceInfo['price']*sourceInfo['unitsPurchase'] > sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']){
                groupInfo['loss'] +=sourceInfo['price']*sourceInfo['unitsPurchase'] - sourceInfo['sellingPrice']*sourceInfo['unitsPurchase'];
                groupInfo.loss_deal.push(sourceInfo['price']*sourceInfo['unitsPurchase'] - sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']);
            }else{
                groupInfo.profit_deal.push(-sourceInfo['price']*sourceInfo['unitsPurchase'] + sourceInfo['sellingPrice']*sourceInfo['unitsPurchase']);

            } 
            var data = JSON.stringify({
                "requestID":sourceInfo._id+"sa" ,
                "amount": {
                  "currency": "INR",
                  "amount": netbalance
                },
                "transferCode": "ATLAS_P2M_AUTH",
                "debitAccountID": groupInfo['groupOwner']['accountholderbankID'],
                "creditAccountID": groupInfo['accountholderbankID'],
                "transferTime": Date.now(),
                "remarks": "Creating group",
                "attributes": {}
              });
              
              var config = {
                method: 'post',
                url: 'https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers',
                headers: { 
                  'accept': 'application/json; charset=utf-8', 
                  'Content-Type': 'application/json', 
                  'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                },
                data : data
              };
              
            var result = await axios(config)
              .then(function (response) {
                return response.data;
            });
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
                name,details,targetPrice,duration,price,editPrice:price,unitsPurchase,approved:approved,type:type,suggestorName,group:groupId
            })
            var config = {
                method: 'get',
                url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${groupInfo['accountholderbankID']}/balance`,
                headers: { 
                  'accept': 'application/json; charset=utf-8', 
                  'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                }
              };
              
            groupInfo['fund']= await axios(config)
              .then(function (response) {
                return response.data.balance;
            })   
            var netBalance = groupInfo['fund']-price*unitsPurchase;
            groupInfo['fund']=netBalance;
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
                let approved = value.set == "true"?true:false;
                if(!approved){
                    sourceInfo.approved = true;
                    sourceInfo.editPrice = 0;
                    sourceInfo.editsuggestion =0;
                    sourceInfo.type = "APPROVED";
                     await this.repository.editSource(sourceInfo);
                     return {"message":"Edit Request Removed"}
                }
                const promise = await this.editSourceDetails(value,{'unitsPurchase':sourceInfo.editsuggestion,'price':sourceInfo.editPrice}); 
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
            var config = {
                method: 'get',
                url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${groupInfo['accountholderbankID']}/balance`,
                headers: { 
                  'accept': 'application/json; charset=utf-8', 
                  'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                }
              };
              
            groupInfo['fund']= await axios(config)
              .then(function (response) {
                return response.data.balance;
            })   
            groupInfo['fund'] = groupInfo['fund']-((args['unitsPurchase']-sourceInfo['unitsPurchase'])*args['price']);
            if(groupInfo['fund']<0){
                throw (new Exceptions.ConflictException("Source funds less than group amount"));
            }
            if(groupInfo.groupOwner == value.uid){
                sourceInfo.type = "APPROVED";
                sourceInfo.approved= true;
                sourceInfo['editsuggestion']=0;
                if(args['unitsPurchase']<sourceInfo['unitsPurchase']){
                    const deal = ((args['unitsPurchase']-sourceInfo['unitsPurchase'])*(args['price']-sourceInfo['price']));
                    var data = JSON.stringify({
                        "requestID":sourceInfo._id+"transaction" ,
                        "amount": {
                          "currency": "INR",
                          "amount": abs((args['unitsPurchase']-sourceInfo['unitsPurchase'])*(args['price']))
                        },
                        "transferCode": "ATLAS_P2M_AUTH",
                        "debitAccountID": groupInfo['groupOwner']['accountholderbankID'],
                        "creditAccountID": groupInfo['accountholderbankID'],
                        "transferTime": Date.now(),
                        "remarks": "Creating group",
                        "attributes": {}
                      });
                      
                      var config = {
                        method: 'post',
                        url: 'https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers',
                        headers: { 
                          'accept': 'application/json; charset=utf-8', 
                          'Content-Type': 'application/json', 
                          'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                        },
                        data : data
                      };
                      
                    var result = await axios(config)
                      .then(function (response) {
                        return response.data;
                    });
                    if(deal>0){
                        groupInfo.loss += deal;
                        groupInfo.loss_deal.push(deal);
                    }else{
                        groupInfo.profit_deal.push(-deal);
                    }
                }else{
                    var data = JSON.stringify({
                        "requestID":sourceInfo._id+"transaction" ,
                        "amount": {
                          "currency": "INR",
                          "amount": abs((sourceInfo['unitsPurchase']-args['unitsPurchase'])*(args['price']))
                        },
                        "transferCode": "ATLAS_P2M_AUTH",
                        "debitAccountID": groupInfo['accountholderbankID'],
                        "creditAccountID": groupInfo['groupOwner']['accountholderbankID'],
                        "transferTime": Date.now(),
                        "remarks": "Creating group",
                        "attributes": {}
                      });
                      
                      var config = {
                        method: 'post',
                        url: 'https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers',
                        headers: { 
                          'accept': 'application/json; charset=utf-8', 
                          'Content-Type': 'application/json', 
                          'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                        },
                        data : data
                      };
                      
                    var result = await axios(config)
                      .then(function (response) {
                        return response.data;
                    });
                }
                sourceInfo['unitsPurchase'] = args.unitsPurchase; 
                sourceInfo['price'] = args['price'];
                await this.repository.editSource(sourceInfo);
                await this.repository.editSource(groupInfo);
                return {'success':true,message:"Source quantity edited"};
            }else{
                sourceInfo.type = "EDIT";
                sourceInfo['editsuggestion'] = args.unitsPurchase;
                sourceInfo['editPrice'] = args.price;
                sourceInfo['approved'] = false;
                await this.repository.editSource(sourceInfo);
                return {'success':true,message:"Edit suggestion sent to Group Owner"};
            }           
        } catch (error) {
            throw error;
        }
    }

    async getAprroval(uid){
        try {
            let sourceInfo = await this.repository.findGroupApprovalAdd();
            function checkUid(args) {
                if(!args.group)return false;
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
            var config = {
                method: 'get',
                url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${groupInfo['accountholderbankID']}/balance`,
                headers: { 
                  'accept': 'application/json; charset=utf-8', 
                  'X-Zeta-AuthToken': process.env.XZetaAuthToken,
                }
              };
              
            groupInfo['fund']= await axios(config)
              .then(function (response) {
                return response.data.balance;
            })   
            groupInfo['fund'] = groupInfo['fund']-sourceInfo["editPrice"]*sourceInfo['unitsPurchase'];
            if(groupInfo['fund']<0){
                throw {"message":`Source price more than current fund of group, exceeds by = ${sourceInfo["price"]*sourceInfo['unitsPurchase']-groupInfo['fund']}`}
            }
            let approved = args.set == "true"?true:false;
            if(approved){
                sourceInfo.approved = true;
                sourceInfo.type = "APPROVED";
                sourceInfo.price = sourceInfo.editPrice;
                sourceInfo.editPrice = 0;
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


    async setApproval(request) {
        try {
            let sourceInfo = await this.repository.findSource(request.params.sid);
            let promise;
            const value={'sid':request.params.sid};
            value['uid'] = request.params.uid;
            if(request.params.uid != sourceInfo.group.groupOwner){
                throw (new Exceptions.ValidationException({"message":"No authorization"}));
            }
            if(sourceInfo.type == "ADD"){
                value['set'] = request.body.set;
                promise = await this.setAprrovalAdd(value);
            }else if(sourceInfo.type == "EDIT"){
              value['set'] = request.body.set;
              promise  =  await this.getSourceDetails(request.params.sid,true,value)
            }else if(sourceInfo.type == "REMOVE"){
                value['sellingPrice'] = sourceInfo.sellingPrice;  
                promise = await this.deleteSource(value);
            }
            return promise;

          } catch(error){
            throw (new Exceptions.ValidationException(error.message));
          }
    }
}