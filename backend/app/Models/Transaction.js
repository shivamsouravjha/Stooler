const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const transactionSchema = new schema({
    deposited_amount:{type : Number},
    returned_amount:{type : Number},
    due_amount:{type : Number},
    result:{type : Number},
    groupId: {type :mongoose.Types.ObjectId,required:true,ref:'Group'},
    userId:{type :mongoose.Types.ObjectId,required:true,ref:'User'},
    type:{type: String},
},{
    versionKey: false 
  });

  transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.models['Transaction'] || mongoose.model("Transaction", transactionSchema)