const Product = require("../models/Product.js");

const auth = require("../auth.js");

// Create New Product
module.exports.createProduct = (request, response) => {

	const userData = auth.decode(request.headers.authorization);

	// console.log(userData);

	if(userData.isAdmin){

		const newProduct = new Product({
			name: request.body.name,
			description: request.body.description,
			price: request.body.price,
			isActive: request.body.isActive
		})

		newProduct.save()
		.then(save => response.send('Product successfully created!'))
		.catch(error => response.send(error))

	}else{
		return response.send("You don't have an access.")
	}

}

// Retrieve all product

module.exports.getAllProducts = (request, response) => {

	let userData; 

	try{
		userData = auth.decode(request.headers.authorization);
	}catch(error){
		return response.send(error.message);
	}

	if(userData.isAdmin){
		Product.find({})
		.then(result => {
			response.send(result);
		}).catch(error => response.send(error))
	}else{
		return response.send("You don't have an access.")
	}
};

// Retrieve all active products

module.exports.getAllActiveProducts = (request, response) => {

	let userData; 

	try{
		userData = auth.decode(request.headers.authorization);
	}catch(error){
		return response.send(error.message);
	}


	if(!userData.isAdmin){
		Product.find({isActive : request.body.isActive})
		.then(result => {
			response.send(result);
		}).catch(error => response.send(error))
	}else{
		return response.send("For non-admin users only!")
	}
}

// Retrieve single product

module.exports.getSingleProducts = (request, response) => {

	let userData; 

	try{
		userData = auth.decode(request.headers.authorization);
	}catch(error){
		return response.send(error.message);
	}
	
	if (userData.isAdmin) {
	    Product.findOne({_id : request.params.id})
		.then(result => {
		    if (result.isActive) {
		        response.send(result);
		    } else {
		        response.send("Product is active!");
		    }
	    }).catch(error => response.send(error));
	} else {
	    Product.findOne({ _id: request.params.id, isActive: true })
		.then(result => {
		    if (result) {
		        response.send(result);
		    } else {
		        response.send("Product not found or not active!");
		    }
	  	}).catch(error => response.send(error));
	}
};

// Update product information
module.exports.updateProductInformation = (request, response) => {

	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.id;
	const updatedProduct = {
			name: request.body.name,
			description: request.body.description,
			price: request.body.price,
		};

	if(userData.isAdmin && productId){
		Product.findByIdAndUpdate(productId, updatedProduct)
		.then(result => {
			if(result){
				return response.send("Product is updated!")
			} else {
				return response.send("Product is not found!")
			}
		}).catch(error => response.send(error))
	}else{
		return response.send("You don't have an access.")
	}
}

// Archive a Product
module.exports.archiveProduct = (request, response) => {
	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.id;

	// console.log(productId);
	if(userData.isAdmin && productId){
		Product.findByIdAndUpdate(productId, {isActive : request.body.isActive}, {new:true})
		.then(result => {
			if(result){
				if(result.isActive === false){
					response.send("Successfully archived the product!")
					console.log(result)
				} else {
					response.send("Successfully unarchived the product!")
				}
			}else{
				response.send("Product is not found.")
			}
		})	
		.catch(error => response.send(error))
	}else{
		return response.send("You don't have an access.")
	}
}