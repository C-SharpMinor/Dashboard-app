const express= require('express')
const router= express.Router()

const {getAllProperties, getProperty, createProperty, updateProperty, deleteProperty }= require('../controllers/propertyControllers.js')

router.route('/')
    .get(getAllProperties)
    .post(createProperty)
router.route('/:id')
    .get(getProperty)
    .patch(updateProperty)
    .delete(deleteProperty)

module.exports = router