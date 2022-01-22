const express = require('express')
const router = express.Router();
const controllerUser = require('../controllers/user_controller')
const { validationResult, body } = require('express-validator')

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
    body('username').notEmpty().escape(),
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