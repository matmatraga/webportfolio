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

	const products = request.params.id;
	const updatedProductQuantities = {
		userId : request.body.userId,
		products : request.body.products
	}
	

	Cart.findByIdAndUpdate(products, updatedProductQuantities, {new:true})
	.then(result => {
		if(!result){
			return response.send("Product ID is not found!")
		}else {
			return response.send(result)
		}
	}).catch(error => response.send(error))
}

// Remove Products from Cart