const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const groupSchema = new schema({
    groupName: {type :String },
    description: {type :String },
    genre: {type :String},
    duration: {type :String },
    amount: {type :Number},
    fund: {type:Number},
    loss: {type:Number},
    totalsum: {type:Number},
    profit_deal: [{type: Number,required: false}],
    loss_deal: [{type: Number,required: false}],
    members: [{type :mongoose.Types.ObjectId,required:false,ref:'User'}],
    groupOwner: {type :mongoose.Types.ObjectId,required:false,ref:'User'},
    groupPayment: [{type :mongoose.Types.ObjectId,required:false,ref:'Transaction'}],
    sources: [{type :mongoose.Types.ObjectId,required:false,ref:'Source'}],
    dues: [{type :mongoose.Types.ObjectId,required:true,ref:'Transaction'}],
},{
    versionKey: false 
  });

groupSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Group',groupSchema);