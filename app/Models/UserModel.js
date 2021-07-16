const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const userschema = new schema({
    name: {type :String },
    panNumber: {type :String },
    aadhar: {type :String},
    username: {type :String },
    email: {type :String,},
    password: {type :String },
    number:{type :Number},
    funds:{type :Number},
    loss:{type :Number},
    dues:{type :Number},
    groups: [{type :mongoose.Types.ObjectId,required:true,ref:'Group'}],
    transaction: [{type :mongoose.Types.ObjectId,required:true,ref:'Transaction'}],
    shares: [{genre:String,amount:Number}],
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);

module.exports = mongoose.models['User'] || mongoose.model("User", userschema)