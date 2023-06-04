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
module.exports.removeCart = (request, response) => {

	const cart = request.params.id;
	
	Cart.findByIdAndDelete(cart, {userId : request.body.userId}, {new:true})
	.then(result => {
		if(!result){
			return response.send("Cart ID is not found!")
		}else {
			return response.send("Cart has been removed!")
		}
	}).catch(error => response.send(error))
}

// Subtotal for each item
module.exports.subTotals = (request, response) => {
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
        return { name: product.productId.name, subtotal, quantity: product.quantity };
      });

      response.send(subTotals);
    })
    .catch((error) => response.send(error));
};

// Total items

module.exports.totalPrice = (request, response) => {
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
};
