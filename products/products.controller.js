var Products = require('./products.doa')
exports.addProduct = function(req,res,next){
	var errorCode = 0;
    var errorMessage = "";
	var product = {
		name 			:	req.body.name,
		category		:	req.body.category,
		subCategory 	:	req.body.subCategory,
		specification	:	req.body.specification,
		isAffiliate		:	req.body.isAffiliate,
		isFeatured		:	req.body.isFeatured,
		affiliate		:	req.body.affiliate,
		longDiscription	:	req.body.longDiscription,
		shortDiscription:	req.body.shortDiscription,
		userID			:	app.get('UserID')
	}
	
	Products.create(product,function(err,product){
		if(!err){
			errorCode = 1;
            errorMessage = "Created Sucessfully";
		}else{
			 errorCode = 0;
             errorMessage = err;
		}
		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
            }
        }
        res.json(response)
	})
}

exports.adminGetProducts = function(req,res,cb){
	var errorCode = 0;
	var errorMessage = "";
	var products = "";
	Products.getResult({userID : app.get('UserID')},function(err,product){
		if(err){
			errorCode = 0;
        	errorMessage = err;
		} else{
			errorCode = 1;
			errorMessage = "Success..!";
			var ProArray = [];
			for (var i = 0; i < product.length; i++) {
				ProArray[i] = {
					"id":  product[i]._id , 
					"affiliate":  product[i].affiliate , 
					"category": product[i].category, 
					"subCategory": product[i].subCategory, 
					"specification": product[i].specification,
					"isAffiliate": product[i].isAffiliate,
					"isFeatured": product[i].isFeatured,
					"longDiscription": product[i].longDiscription,
					"shortDiscription": product[i].shortDiscription,
					"userID": product[i].userID,
					"createdAt" : product[i].createdAt,
				}
			}
			products =  ProArray;
		}
		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
			},
			"result":{
				"Products" : products
			}
        }
        res.json(response)
	})
}


exports.getProducts = function(req,res,cb){
	var errorCode = 0;
	var errorMessage = "";
	var products = "";
	Products.getResult({},function(err,product){
		if(err){
			errorCode = 0;
        	errorMessage = err;
		} else{
			errorCode = 1;
			errorMessage = "Success..!";
			var ProArray = [];
			for (var i = 0; i < product.length; i++) {
				ProArray[i] = {
					"id":  product[i]._id , 
					"affiliate":  product[i].affiliate , 
					"category": product[i].category, 
					"subCategory": product[i].subCategory, 
					"specification": product[i].specification,
					"isAffiliate": product[i].isAffiliate,
					"isFeatured": product[i].isFeatured,
					"longDiscription": product[i].longDiscription,
					"shortDiscription": product[i].shortDiscription,
					"userID": product[i].userID,
					"createdAt" : product[i].createdAt,
				}
			}
			products =  ProArray;
		}
		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
			},
			"result":{
				"Products" : products
			}
        }
        res.json(response)
	})
}


exports.getProduct = function(req,res,cb){
	var errorCode = 0;
	var errorMessage = "";
	var product = "";
	Products.getRow({'_id':req.body.id},function(err,product){
		if(err){
			errorCode = 0;
        	errorMessage = err;
		}else{
			errorCode = 1;
			errorMessage = "Success..!";
			ProArray = {
					"id":  product._id , 
					"affiliate":  product.affiliate , 
					"category": product.category, 
					"subCategory": product.subCategory, 
					"specification": product.specification,
					"isAffiliate": product.isAffiliate,
					"isFeatured": product.isFeatured,
					"longDiscription": product.longDiscription,
					"shortDiscription": product.shortDiscription,
					"userID": product.userID,
					"createdAt" : product.createdAt,
				}
			product = ProArray;
		}

		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
			},
			"result":{
				"Product" : product
			}
        }
        res.json(response)
	})
}

exports.updateProduct = function(req,res,next){
	var errorCode = 0;
	var errorMessage = "";
	Products.update({_id:req.body.id},req.body.updateData,function(err,product){
		if(!err){
			errorCode = 1;
            errorMessage = "Sucessfully Updated!";
		}else{
			 errorCode = 0;
             errorMessage = err;
		}
		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
            }
        }
        res.json(response)
	})
}

exports.deleteProduct = function(req,res){
	var errorCode = 0;
	var errorMessage = "";
	Products.delete({_id:req.body.id},function(err,porduct){
		if(!err){
			errorCode = 1;
            errorMessage = "Sucessfully Deleted!";
		}else{
			 errorCode = 0;
             errorMessage = err;
		}
		var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
            }
        }
        res.json(response)
	})

}