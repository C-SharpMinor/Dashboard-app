const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
name:{type: String, required: true},
email:{type: String, required:true, unique: true},
avatar:{type: String},
allProperties: [{type: mongoose.Schema.Types.ObjectId, ref:'Property'}]
}
)
const userModel = mongoose.model('User', userSchema)

module.exports = userModel
