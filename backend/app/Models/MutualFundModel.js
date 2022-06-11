const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const MFSchema = new schema({
    tradingsymbol: {type :String ,unique:true },
    amc: {type :String },
    name: {type :String},
    purchase_allowed: {type :Boolean },
    redemption_allowed: {type :Boolean },
    minimum_purchase_amount: {type :Number },
    purchase_amount_multiplier: {type :Number },
    minimum_additional_purchase_amount: {type :Number },
    minimum_redemption_quantity: {type :Number},
    redemption_quantity_multiplier: {type:Number},
    dividend_type: {type:String},
    scheme_type: {type:String},
    plan: {type:String},
    settlement_type: {type:String},
    last_price: {type:Number},
    last_price_date: {type: Date},
},{
    versionKey: false 
  });

MFSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MutualFunds',MFSchema);