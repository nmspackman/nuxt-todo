var express = require('express')
var router = express.Router()

let user_controller = require('../controllers/userController')

// get all users
router.get('/', user_controller.user_list)

// create user
router.post('/user/create', user_controller.user_create_post)

module.exports = router
