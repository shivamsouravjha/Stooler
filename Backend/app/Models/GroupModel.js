const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const groupSchema = new schema({
    groupName: {type :String },
    description: {type :String },
    genre: {type :String},
    duration: {type :String },
    amount: {type :String,},
},{
    versionKey: false 
  });

userschema.plugin(uniqueValidator);
module.exports = mongoose.model('group',groupSchema);