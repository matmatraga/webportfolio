const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const usersRoutes = require("./routes/usersRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const port = 5000;

const app = express();

// MONGODB CONNECTION
	mongoose.connect("mongodb+srv://admin:admin@batch288raga.o5oepb3.mongodb.net/E-CommerceAPI?retryWrites=true&w=majority", {
		useNewUrlParser: true, 
		useUnifiedTopology: true
		})

	const db = mongoose.connection;
		
		db.on("error", console.error.bind(console, "Error, can't connect to the db!"))

		db.once("open", () => console.log('Connected to the cloud database!'))

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use('/users', usersRoutes);
app.use('/users', productRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}!`))

