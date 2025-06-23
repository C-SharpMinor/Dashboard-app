const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
name:{type: String, required: true},
email:{type: String, required:true},
img:{type: String}}
)
const userModel = mongoose.model('User', userSchema)

module.export = userModel
