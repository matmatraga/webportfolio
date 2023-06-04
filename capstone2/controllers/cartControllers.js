const Cart = require("../models/Cart.js");

// added products
module.exports.addedProducts = (request, response) => {

	const newCart = new Cart ({
		userId : request.body.userId,
		products : request.body.products
	})

	newCart.save()
	.then(save => response.send(save))
	.catch(error => response.send(error));
}

// Change product quantities
module.exports.changeProductQuantities = (request, response) => {

	const cart = request.params.id;
	const updatedProductQuantities = {
		userId : request.body.userId,
		products : request.body.products
	}
	

	Cart.findByIdAndUpdate(cart, updatedProductQuantities, {new:true})
	.then(result => {
		if(!result){
			return response.send("Cart ID is not found!")
		}else {
			return response.send("Product quantity has been changed!")
		}
	}).catch(error => response.send(error))
}

// Remove Products from Cart
module.exports.removeProducts = (request, response) => {

	const cart = request.params.id;
	
	Cart.findByIdAndDelete(cart, {userId : request.body.userId}, {new:true})
	.then(result => {
		if(!result){
			return response.send("Cart ID is not found!")
		}else {
			return response.send("Product has been removed!")
		}
	}).catch(error => response.send(error))
}

// Subtotal for each item
