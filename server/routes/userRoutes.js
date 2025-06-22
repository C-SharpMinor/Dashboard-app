const express = require('express')
const router= express.Router()
const {getAllUsers, getUser, createUser, updateUser, deleteUser }= require('../contollers/userControllers.js')

router('/').get(getAllUsers)
router('/:id').get(getUser)
router('/').post(createUser)
router('/').patch(updateUser)
router('/').delete(deleteUser)

module.exports = router