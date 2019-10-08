var mongooes = require('mongoose')
var Schema = mongooes.Schema

var authSchema = new Schema({
    name :{
        type:String,
        unique:false,
        required:true      
    },
    password :{
        type:String,
        unique:false,
        required:true      
    },
    role :{
        type:String,
        unique:false,
        required:true      
    },
    description : {
        type:String,
        unique:false,
        required:true
    }
}, {
    timestamps : true   
});

module.exports = authSchema; 