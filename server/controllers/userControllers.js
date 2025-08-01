const User = require('../models/userModel')

const createUser = async (req, res) =>{
    
    try{
    const {name, email, avatar}= req.body
    const user= await User.findOne({email})
    if(user){
        res.status(200).json(user)
    }
    else{
        const newUser= await User.create({name, email, avatar})
        // new User.save()

        res.status(201).json(newUser)
    }
    }
catch(error){
    res.status(500).json(error.message)
}


}
const getAllUsers = async (req, res)=>{
    try{
    
        const allUsers= await User.find({})
        res.status(200).json(allUsers)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
const getUser= async(req, res)=>{}
const updateUser= async(req, res)=>{}
const deleteUser= async(req, res)=>{}

module.exports = {createUser, getAllUsers, getUser, updateUser, deleteUser}