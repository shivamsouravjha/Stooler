const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const sourceSchema = new schema({
    name: {type :String,required: true },
    details: {type :String ,required: true},
    targetPrice: {type : Number,required: true},
    duration: {type :String ,required: true},
    price: {type :Number,required: true},
    editPrice: {type :Number,required: true},
    sellingPrice: {type :Number},
    unitsPurchase: {type: Number,required: true},
    approved: {type: Boolean},
    type: {type: String},
    editsuggestion: {type: Number},
    suggestorName: {type: String},
    group:{type :mongoose.Types.ObjectId,required:false,ref:'Group'},
},{
    versionKey: false 
  });

module.exports = mongoose.models['Source'] || mongoose.model("Source", sourceSchema)