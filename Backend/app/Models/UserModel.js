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
    number:{type :String,},
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userschema);