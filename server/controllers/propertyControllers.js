const Property= require('../models/propertyModel.js')
const User= require('../models/userModel.js')

const dotenv= require('dotenv')
dotenv.config()
const cloudinary= require('cloudinary').v2 //this is same as import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

const getAllProperties= async(req, res)=>{
    try{
    
        const allProperties= await Property.find({})
        res.status(200).json(allProperties)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
const getProperty= async(req, res)=>{}
const deleteProperty= async(req, res)=>{}
const updateProperty= async(req, res)=>{}

const createProperty= async(req, res)=>{
    try{
        const {title, description, propertyType, location, price, photo, email}= req.body

        //starting a session
        const session= await mongoose.startSession()
        session.startTransaction()

        const user= await User.findOne({email}).session(session)
        
        if(!user) throw new Error("user not found")
        
        const photoURL= await cloudinary.uploader.upload(photo)

        const newProperty= await Property.create({
            title, 
            description,
            propertyType,
            location,
            price,
            photo,
            creator: user._id})

        user.allProperties.push(newProperty._id)
        await user.save({session})

        await session.commitTransaction()

        res.status(201).json({message: "Property created successfully"})

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports= {getAllProperties, getProperty, deleteProperty, createProperty, updateProperty}
