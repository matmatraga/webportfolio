const Order = require("../models/Order.js");

const auth = require("../auth.js");
// Create Order
module.exports.createOrder = (request, response) => {
	
	const newOrder = new Order ({
		userId : request.body.userId,
		products: request.body.products,
		totalAmount: request.body.totalAmount
	})

	newOrder.save()
	.then(save => response.send(save))
	.catch(error => response.send(error));
}

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
