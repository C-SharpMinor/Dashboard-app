const mongoose = require ('mongoose')

const propertySchema= new mongoose.Schema({
    title:{type:String, required: true},
    description: {type: String, required: true},
    propertyType:{type:String, required: true},
    location:{type: String, required: true},
    price:{type: Number, required: true},
    photo:{type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} //this is used to make reference to a separate document. what was written jn the tyle field is what is telling the mongodb to point to(a reference) another document in the db using the type 'ObjectId'
    
})
const propertyModel= mongoose.model('Property', propertySchema)

module.exports = propertyModel