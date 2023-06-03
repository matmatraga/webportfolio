const Order = require("../models/Order.js");

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



