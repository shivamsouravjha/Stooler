const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const stockSchema = new schema({
    token: {type :String ,unique:true},
    symbol: {type :String },
    name: {type :String},
    expiry: {type :String },
    strike: {type :Number },
    lotsize: {type :Number },
    instrumenttype: {type :String },
    exch_seg: {type :String },
    tick_size: {type :Number},
},{
    versionKey: false 
  });

stockSchema.plugin(uniqueValidator);
module.exports = mongoose.model('StockData',stockSchema);