const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");

const auth = require("../auth.js");

// REGISTER
module.exports.registerUser = (request, response) => {
	Users.find({email : request.body.email})
	.then(result => {

		if(result.length > 0){
			return response.send(`${request.body.email} has been taken! Use different email or sign up!`)
		}else {
			let newUser = new Users({
				email: request.body.email,
				password: bcrypt.hashSync(request.body.password, 10),
				isAdmin: request.body.isAdmin,
			})

			newUser.save()
			.then(saved => response.send(`${request.body.email} is now registered!`))
			.catch(error => response.send(error))
		}
	})
	.catch(error => response.send(error));
}

// LOGIN (user authentication)
module.exports.loginUser = (request, response) => {
	Users.findOne({email : request.body.email})
	.then(result => {
		if(!result){
			return response.send(`${request.body.email} is not yet registered! Please register!`)
		}else {
			const isPasswordCorrect = bcrypt.compareSync(request.body.password, result.password)

			if(isPasswordCorrect){
				return response.send({
				auth : auth.createAccessToken(result)
				})
			}else{
				return response.send("Please check your Password!")
			}
		}
	}).catch(error => response.send(error))
}


// module.exports.getProfile = (request, response) => {
// 	const userId = request.body.id;

// 	const userData = auth.decode(request.headers.authorization);

// 	// console.log(userData);

// 	if(userData.isAdmin){
// 		Users.findById(userId)
// 		.then(user => {
// 			user.password = ""
// 			return response.send(user);
// 		}).catch(error => response.send(error))
// 	}else{
// 		return response.send(`Your are not an admin, you don't have access to this route.`)
// 	}
// }

// RETRIEVING USER DETAILS
module.exports.retrieveUserDetails = (request, response) => {

	const userId = request.params.id;

	const userData = auth.decode(request.headers.authorization);

	if(userData.isAdmin && userId){
		Users.findById(userId)
		.then(result => {
			result.password = ""
			if(!result){
			return response.send("User ID is not found!")
			}else{
				return response.send(result)
			}
		}).catch(error => response.send(error))
	}
}
