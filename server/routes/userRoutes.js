const express = require('express')
const router= express.Router()
const { getAllUsers, getUser, createUser, updateUser, deleteUser }= require('../controllers/userControllers.js')

router.route('/').get(getAllUsers)
router.route('/').post(createUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router