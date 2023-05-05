import * as Exceptions from '../Exceptions/Exceptions';
import SourceRepository from '../Database-interaction/sourceRepositroy';
import SourceModel from "../Models/sourceModel";
import fetch from 'node-fetch';
const fs = require('fs');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const https = require('https');
const {readFile} = require("fs");
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
            if(args.uid != groupInfo.groupOwner){       //getting edit if requester is not the owner or else delete the source
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
            groupInfo['fund'] = groupInfo['fund']-((args['unitsPurchase']-sourceInfo['unitsPurchase'])*args['price']);
            if(groupInfo['fund']<0){
                throw (new Exceptions.ConflictException("Source funds less than group amount"));
            }
            if(groupInfo.groupOwner == value.uid){  //if requester is owner approve the edit or else sent to owner
                sourceInfo.type = "APPROVED";
                sourceInfo.approved= true;
                sourceInfo['editsuggestion']=0;
                if(args['unitsPurchase']<sourceInfo['unitsPurchase']){
                    const deal = ((args['unitsPurchase']-sourceInfo['unitsPurchase'])*(args['price']-sourceInfo['price']));
                    if(deal>0){
                        groupInfo.loss += deal;
                        groupInfo.loss_deal.push(deal);
                    }else{
                        groupInfo.profit_deal.push(-deal);
                    }
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
            sourceInfo = sourceInfo.filter(checkUid);   ///return all the sources that belong to the group ,to the group owner for approval
            return {'groups':sourceInfo};
        } catch (error) {
            throw (new Exceptions.ValidationException("Error finding sources"));
        }
    }
    
    async setAprrovalAdd(args){
        try {
            let sourceInfo = await this.repository.findSource(args.sid);
            let groupInfo  = await this.repository.findGroup(sourceInfo.group)
            groupInfo['fund'] = groupInfo['fund']-sourceInfo["editPrice"]*sourceInfo['unitsPurchase'];
            if(groupInfo['fund']<0){
                throw {"message":`Source price more than current fund of group, exceeds by = ${sourceInfo["price"]*sourceInfo['unitsPurchase']-groupInfo['fund']}`}
            }
            let approved = args.set == "true"?true:false;
            if(approved){       //if user approves of suggestion
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
            if(sourceInfo.type == "ADD"){   ///if request is of add
                value['set'] = request.body.set;
                promise = await this.setAprrovalAdd(value);
            }else if(sourceInfo.type == "EDIT"){        //if request is of edit
              value['set'] = request.body.set;
              promise  =  await this.getSourceDetails(request.params.sid,true,value)
            }else if(sourceInfo.type == "REMOVE"){      //if request is of deletion
                value['sellingPrice'] = sourceInfo.sellingPrice;  
                promise = await this.deleteSource(value);
            }
            return promise;

          } catch(error){
            throw (new Exceptions.ValidationException(error.message));
          }
    }
    
    
    async getCatalogue(args) {
        try {
            function clean(obj) {
                for (var propName in obj) {
                  if (obj[propName] === null || obj[propName] === '') {
                    delete obj[propName];
                  }
                }
                return obj
            }
            args = clean(args);   //cleaning the body for empty parameters(as body can contain terms rquired for sorting group)
            let groupsInfo = await this.repository.findMutualFundCatalgoue(args);
            return groupsInfo;
          } catch(error){
            throw (new Exceptions.ValidationException(error.message));
          }
    }


    async updateMutualFunds() {
        try {
            https.get("https://api.kite.trade/mf/instruments",async (res) => {
                // Image will be stored at this path
                const path = `./app/Controllers/mutualFund.csv`; 
                const filePath = fs.createWriteStream(path);
                res.pipe(filePath);
                filePath.on('finish',async () => {
                    readFile(`./app/Controllers/mutualFund.csv`, "utf8", async (error, textContent) => {
                        if(error){ throw error; }
                        let count=0
                        for(let row of textContent.split("\n")){
                          const rowItems = row.split(",");
                          let date = rowItems[15].split("\r");
                          if(rowItems[0]!="tradingsymbol"){
                          let unitdata =  {
                            "tradingsymbol":rowItems[0],"amc":rowItems[1],
                            "name":rowItems[2],"purchase_allowed":(rowItems[3] === '1'),
                            "redemption_allowed":(rowItems[4] === 'true'),"minimum_purchase_amount":rowItems[5],
                            "purchase_amount_multiplier":rowItems[6],"minimum_additional_purchase_amount":rowItems[7],
                            "minimum_redemption_quantity":rowItems[8],"redemption_quantity_multiplier":rowItems[9],
                            "dividend_type":rowItems[10],"scheme_type":rowItems[11],
                            "plan":rowItems[12],"settlement_type":rowItems[13],
                            "last_price":rowItems[14],"last_price_date":date[0],
                          }
                          await this.repository.bulkUpsertMutualFundData(unitdata)
                          console.log(count)
                          count+=1
                        }
                        }

                      })
                    filePath.close();
                    await unlinkAsync(path);
                })
            })    
            return "request";
          } catch(error){
              console.log(error)
            throw (new Exceptions.ValidationException(error.message));
          }
    }
    
    async updateStocks() {
        try {
            var url = 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json';            
           
            let settings = { method: "Get" };
            fetch(url, settings)
            .then(res => res.json())
            .then(async(json) => {
                for (let i = 0; i < json.length; i++) {
                    console.log(i)
                    if(json[i].exch_seg=="BSE"||json[i].exch_seg=="NSE")
                    await this.repository.bulkUpsertStocksData(json[i])
                  }                
            });
            return "request";
          } catch(error){
              console.log(error)
            throw (new Exceptions.ValidationException(error.message));
          }
    }
}