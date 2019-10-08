var mongooes = require('mongoose')
var authSchema = require('./auth.model')
authSchema.statics = {
    create : function(data, cb) {
        var user = new this(data);
        user.save(cb);
    },    
    getResult : function (query,cb){
        this.find(query,cb)
    },

    getRow : function (query,cb){
        this.findOne(query,cb)
    },

    update : function (query,updateData,cb){
        this.findOneAndUpdate(query,{$set: updateData},{new: true},cb);
    },
    
    delete: function (query,cb){
        this.findOneDelete(query,cb);        
    }
}

var authModel = mongooes.model('Users',authSchema)
module.exports = authModel