var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
		name : {
			type:String,
			unique : false,
			required : true
		},
		category : {
			type : String,
			unique : false,
			required : true
		},
		subCategory:{
			type : String,
			unique:false,
			required : true
		},
		specification :{
			type : String,
			unique:false,
			required : true
		},
		isAffiliate : {
			type: String,
			unique:false,
			required:true
		},
		isFeatured :{
			type:String,
			unique:false,
			required:true
		},
		affiliate:{
			type:Array,
			unique:false,
			required:true
		},
		longDiscription:{
			type:String,
			unique:false,
			required:true
		},
		shortDiscription:{
			type:String,
			unique:false,
			required:true
		},
		userID:{
			type:String,
			unique:false,
			required:true
		}
},{
		timestamps : true
})

module.exports = productSchema; 