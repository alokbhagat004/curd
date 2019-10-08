var mongooes = require('mongoose')
var productSchema = require('./products.model')

productSchema.statics = {
	create : function(data,cb){
		var product = new this(data);
		product.save(cb)
	},
	getRow : function(query,cb){
		this.findOne(query,cb)
	},
	getResult : function(query,cb){
		this.find(query,cb)
	},
	update : function(query,updateData,cb){
		 this.findOneAndUpdate(query,{$set: updateData},{new: true},cb);
	},
	delete : function(query,cb){
		this.findOneAndDelete(query,cb)
	}
}

var porductModel = mongooes.model('Products',productSchema)
module.exports = porductModel