var product = require('./products.controller')
module.exports = function (router){
	router.post('/add_product', product.addProduct)
	router.post('/admin_get_products', product.adminGetProducts)
	router.post('/get_products', product.getProducts)
	router.post('/get_product', product.getProduct)
	router.post('/update_product',product.updateProduct)
	router.post('/delete_product',product.deleteProduct)
}

