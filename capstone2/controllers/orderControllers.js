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

// Retrieve user details
module.exports.retrieveUserDetails = (request, response) => {

	const userId = request.params.userId;
	console.log(userId);

	if(userId){
		User.findById(userId)
		.then(result => {
			return response.send(result)
		}).catch(error => response.send(error))
	}else{
		return response.send("User ID not found!")
	}
}


