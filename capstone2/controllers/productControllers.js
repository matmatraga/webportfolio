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
		.then(save => response.send(save))
		.catch(error => response.send(false))

	}else{
		return response.send(false)
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
		}).catch(error => response.send(false))
	}else{
		return response.send(false)
	}
};

// Retrieve all active products

module.exports.getAllActiveProducts = (request, response) => {

		Product.find({isActive : true})
		.then(result => response.send(result))
		.catch(error => response.send(false))
}

// Retrieve single product

module.exports.getSingleProducts = (request, response) => {

	const productId = request.params.productId;
	console.log(request.params)
	console.log(productId)
	Product.findById(productId)
		.then(result => response.send(result))
		.catch(error => response.send(error));

}

// Update product information
module.exports.updateProductInformation = (request, response) => {

	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.productId;
	const updatedProduct = {
			name: request.body.name,
			description: request.body.description,
			price: request.body.price,
		};

	if(userData.isAdmin && productId){
		Product.findByIdAndUpdate(productId, updatedProduct)
		.then(result => {
			if(result){
				return response.send(result)
			} else {
				return response.send(false)
			}
		}).catch(error => response.send(false))
	}else{
		return response.send(false)
	}
}

// Archive a Product
module.exports.archiveProduct = (request, response) => {
	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.productId;

	if(userData.isAdmin && productId){
		Product.findByIdAndUpdate(productId, {isActive : request.body.isActive}, {new:true})
		.then(result => {
			response.send(result)
		})	
		.catch(error => response.send(false))
	}else{
		return response.send(false)
	}
}