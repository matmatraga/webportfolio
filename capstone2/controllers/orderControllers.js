const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");

const auth = require("../auth.js");
// Create Order
module.exports.createOrder = (request, response) => {	
	const userId = request.body.userId;
	const cartId = request.body.cartId;
	// const orderId = request.params.id

	Cart.findById(cartId)
		.populate({
			path: 'products',
			populate: {
				path: 'productId',
				model: 'Product'
			}
		})
		.then((cart) => {
			if(!cart){
				return response.send("Cart not found.");
			}

			let shippingFee = 40;
			let subTotal = 0;
			cart.products.forEach((product) => {
				subTotal += (product.quantity * product.productId.price)
			})

			const salesTax = subTotal * 0.12;
			const total = salesTax + shippingFee + subTotal;

			const formattedProducts = cart.products.map((product) => ({
			    productId: product.productId.id,
			    quantity: product.quantity
			 }));

			const newOrder = new Order ({
				userId : userId,
				products: formattedProducts,
				totalAmount: total
			})

			newOrder.save()
			.then(save => response.send(save))
			.catch(error => response.send(error));

		}).catch(error => response.send(error));
};		

// Retrive Login (Authenticated) User's Order
module.exports.getAuthenticatedUserOrders = (request, response) => {

	const orderId = request.params.id;

	Order.findById(orderId)
	.then(orders => {
		response.send(orders)
	}).catch(error => response.send(error))
}


// Retrieve All Orders

module.exports.getAllOrders = (request, response) => {

	const userData = auth.decode(request.headers.authorization);

	if(userData.isAdmin){
		Order.find({})
		.then(orders => {
			if(orders.length === 0){
				return response.send("No orders found.")
			}else{
				return response.send(orders)
			}
		}).catch(error => response.send(error))
	}else{
		return response.send("You don't have an access.")
	}
}
