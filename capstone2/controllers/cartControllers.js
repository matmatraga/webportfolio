const Cart = require("../models/Cart.js");
const auth = require("../auth.js");

// added products
module.exports.addedProducts = (request, response) => {

		let userData; 

		try{
				auth.decode(request.headers.authorization);
		}catch(error){
				return response.send(error.message);
		}

	if(!userData.isAdmin){
			const newCart = new Cart ({
				userId : userData.id,
				products : request.body.products
			})

			newCart.save()
			.then(save => response.send(save))
			.catch(error => response.send(error));
	}else{

			return response.send("For non-admin users only!")

	}
}

// Change product quantities
module.exports.changeProductQuantities = (request, response) => {

	let userData; 

	try{
			auth.decode(request.headers.authorization);
	}catch(error){
			return response.send(error.message);
	}
	
	const cart = request.params.id;
	const updatedProductQuantities = {
			userId : userData.id,
			products : request.body.products
	}
	
	if(!userData.isAdmin){
	Cart.findByIdAndUpdate(cart, updatedProductQuantities, {new:true})
			.then(result => {
					if(!result){
							return response.send("Cart ID is not found!")
					}else {
							return response.send("Product quantity has been changed!")
					}
			}).catch(error => response.send(error))
	} else {
			return response.send("For non-admin users only!")
	}
}

// Remove Products from Cart
module.exports.removeCart = (request, response) => {
	
	let userData; 

	try{
			auth.decode(request.headers.authorization);
	}catch(error){
			return response.send(error.message);
	}

	const cart = request.params.id;
	
	if(!userData.isAdmin){
	Cart.findByIdAndDelete(cart, {userId : userData.id}, {new:true})
			.then(result => {
					if(!result){
							return response.send("Cart ID is not found!")
					}else {
							return response.send("Cart has been removed!")
					}
			}).catch(error => response.send(error))
	}else{
		return response.send("For non-admin users only!")
	}
}

// Subtotal for each item
module.exports.subTotals = (request, response) => {

	
	let userData; 

	try{
			auth.decode(request.headers.authorization);
	}catch(error){
			return response.send(error.message);
	}
	

	if(!userData.isAdmin){
	  Cart.findById(request.params.id)
	    .populate({
	      path: 'products',
	      populate: {
	        path: 'productId',
	        model: 'Product'
	      }
	    })
	    .then((cart) => {
	      const subTotals = cart.products.map((product) => {
	        const subtotal = product.quantity * product.productId.price;
	        return {name: product.productId.name, subtotal, quantity: product.quantity };
	      });

	      response.send(subTotals);
	    }).catch((error) => response.send(error));
  }else{
  	return response.send("For non-admin users only!")
  }
};

// Total Amount Items

module.exports.totalPrice = (request, response) => {

	
	let userData; 

	try{
			auth.decode(request.headers.authorization);
	}catch(error){
			return response.send(error.message);
	}
	

	if(!userData.isAdmin){
	  Cart.findById(request.params.id)
	    .populate({
	      path: 'products',
	      populate: {
	        path: 'productId',
	        model: 'Product'
	      }
	    })
	    .then((cart) => {
	      const totalPrice = cart.products.reduce((total,product) => {
	        const subtotal = product.quantity * product.productId.price;
	        return total + subtotal;
	      }, 0);
	      
	      response.send({totalPrice});
	      
	    }).catch((error) => response.send(error))
  }else{
  	return response.send("For non-admin users only!")
  }
};