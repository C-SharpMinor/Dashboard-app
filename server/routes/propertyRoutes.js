const express= require('express')
const router= express.Router()

const {getAllProperties, getProperty, createProperty, updateProperty, deleteProperty }= require('../contollers/propertyControllers.js')

router('/').get(getAllProperties)
router('/id:').get(getProperty)
router('/').post(createProperty)
router('/').patch(updateProperty)
router('/').delete(deleteProperty)

module.exports = router