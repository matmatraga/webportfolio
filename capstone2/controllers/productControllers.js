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
		return response.send("Unauthorized!")
	}

}

// Retrieve all product

module.exports.getAllProducts = (request, response) => {
	Product.find()
	.then(result => {
		response.send(result);
	}).catch(error => response.send(error))
}

// Retrieve all active products

module.exports.getAllActiveProducts = (request, response) => {
	Product.find({isActive : request.body.isActive})
	.then(result => {
		response.send(result);
	}).catch(error => response.send(error))
}

// Retrieve single product

module.exports.getSingleProducts = (request, response) => {
	const productId = request.params.id;
	// console.log(productId);
	if(productId){
		Product.findById(productId)
		.then(result => {
			return response.send(result)
		}).catch(error => response.send(error))
	}else{
		return response.send('Product is not found!')
	}
}

// Update product information
module.exports.updateProductInformation = (request, response) => {

	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.id;
	const updatedProduct = {
			name: request.body.name,
			description: request.body.description,
			price: request.body.price,
			isActive: request.body.isActive
		};

	if(userData.isAdmin && productId){
		// console.log(userData)
		// console.log(productId)
		Product.findByIdAndUpdate(productId, updatedProduct, {new:true})
		.then(result => {
			if(!result){
				return response.send("Product is not found!")
			}else{
				return response.send(result);	
			}
		}).catch(error => response.send(error))
	}
}

// Archive a Product
module.exports.archiveProduct = (request, response) => {
	const userData = auth.decode(request.headers.authorization);

	const productId = request.params.id;
	// console.log(productId);
	if(userData.isAdmin && productId){
		Product.findByIdAndUpdate(productId, {isActive : false}, {new:true})
		.then(result => {
			if(!result){
				return response.send("Product is not found!")
			}else{
				return response.send(result);	
			}
		}).catch(error => response.send(error))
	}
}