require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(formidableMiddleware());
app.use(cors());

//// MONGOOSE
mongoose.connect(process.env.MONGO);

const Text = mongoose.model("Text", {
	description: String,
});

//// GET
app.get("/", async (req, res) => {
	try {
		const textInput = await Text.find();
		res.json({ message: textInput });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//// POST
app.post("/post", async (req, res) => {
	//console.log(req.fields);
	//console.log("1");

	try {
		//console.log("2");

		const newInput = new Text({
			description: req.fields.input,
		});
		//console.log("3");

		await newInput.save();
		//console.log("4");

		res.json({
			message: `input -> "${req.fields.input}" enregistré en bdd mongo`,
		});
		//console.log("5");
	} catch (error) {
		//console.log("6");

		res.status(400).json({ error: error.message });
		// console.log("7");
	}
	//console.log("8");
});

// Remarquez que le `app.listen` doit se trouver après les déclarations des routes
app.listen(process.env.PORT || 3100, () => {
	console.log("Server has started");
});
