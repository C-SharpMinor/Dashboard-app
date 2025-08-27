const Property = require("../models/propertyModel.js");
const User = require("../models/userModel.js");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2; //this is same as import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
	//the below is to provide the frontend with all the data it needs to implement pagination, sorting and filtering
	const {
		_end,
		_order,
		_start,
		_sort,
		title_like = "",
		propertyType = "",
	} = req.query;
	const query = {};
	if (propertyType !== "") {
		query.propertyType = propertyType;
	}
	if (title_like) {
		query.title = { $regex: title_like, $options: "i" }; //the options i means case insensitive
	}

	try {
		const count = await Property.countDocuments({ query });

		//this crashes because it runs even when i have not pressed the sort button yet. So sort and order would be undefined.
		// 					the code after this was the fix
		// const properties = await Property.find(query)
		// 	.limit(_end)
		// 	.skip(_start)
		// 	.sort({ [_sort]: _order });

		let dbQuery = Property.find(query)
			.limit(parseInt(_end))
			.skip(parseInt(_start));

		if (_sort && _order) {
			dbQuery = dbQuery.sort({ [_sort]: _order });
		}

		const properties = await dbQuery;

		res.header("x-total-count", count);
		res.header("Access-Control-Expose-Headers", "x-total-count");
		//previous code here

		// const allProperties = await Property.find({});
		// res.status(200).json(allProperties);

		//adding code to learn how to fetch all of the properties based on pagination, filtering and sorting
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};
const updateProperty = async (req, res) => {};

const createProperty = async (req, res) => {
	try {
		const { title, description, propertyType, location, price, photo, email } =
			req.body;

		//starting a session
		const session = await mongoose.startSession();
		session.startTransaction();

		const user = await User.findOne({ email }).session(session);

		if (!user) throw new Error("user not found");

		const photoURL = await cloudinary.uploader.upload(photo);

		const newProperty = await Property.create({
			title,
			description,
			propertyType,
			location,
			price,
			photo,
			creator: user._id,
		});

		user.allProperties.push(newProperty._id); //this is the part of the mongoose session where we are linking the property here with the user that created it
		await user.save({ session }); //this is the part we save the linking

		await session.commitTransaction();

		res.status(201).json({ message: "Property created successfully" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = {
	getAllProperties,
	getProperty,
	deleteProperty,
	createProperty,
	updateProperty,
};
