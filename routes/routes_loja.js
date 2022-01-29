const express = require('express')
const router = express.Router();
const controller = require('../controllers/loja_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /loja
 * @group Loja
 * @returns {object} 200 - An array of Loja info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/', function (req, res) {
    controller.listAll(req, res);
})


module.exports = router