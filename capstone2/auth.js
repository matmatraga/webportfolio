const jwt = require("jsonwebtoken");

const secret = "E-CommerceAPI";

module.exports.createAccessToken = (user) => {
	const data = {
		id : user._id,
		isAdmin : user.isAdmin,
		email: user.email
	}

	return jwt.sign(data, secret, {});
}

// VERIFYING
module.exports.verify = (request, response, next) => {

	let token = request.headers.authorization;
	// console.log(token)

	if(token){

		token = token.slice(7, token.length);


		return jwt.verify(token, secret, (error, data) => {
			if(error){
				return response.send("Unauthorized access!")
			}else{
				
				next();
			}
		})
	}else{
		return response.send("No token provided!")
	}

}

// DECRYPTING
module.exports.decode = (token) => {

	if(!token) {
		throw new Error("No token provided!")
	}

	token = token.slice(7, token.length);

	return jwt.decode(token, {complete: true}).payload;
}
