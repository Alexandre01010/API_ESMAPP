const express = require('express')
const router = express.Router();
const controllerUser = require('../controllers/user_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route POST /registar
 * @group Users
 * @param {object} object.body.texto - User Credentials - ex. {"username":"admin", "password":"admin", "email": "admin@gmail.com"}
 * @returns {object} 201 - Created
 * @returns {Error} 400 - Unexpected Error
 * 
 */
/**
 * @route POST /login
 * @group Users
 * @param {object} object.body - User Credentials - ex. {"username":"admin", "password":"admin"}
 * @returns {object} 200 -  Bearer Token
 * @returns {Error} 400 - Unexpected Error
 */
/**
 * @route GET /
 * @group Users
 * @returns {object} 200 - An array of Users info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */





router.post('/registar', [
    body('username').notEmpty().escape(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),

], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controllerUser.signUp(req, res);
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.post('/login', [
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape(),

], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controllerUser.signIn(req, res);
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})





router.get('/', function (req, res) {
    controller.listAll(req, res);
})


module.exports=router