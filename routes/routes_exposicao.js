const express = require('express')
const router = express.Router();
const controller = require('../controllers/exposicao_controller')
const { validationResult, body } = require('express-validator')



router.get('/', function (req, res) {
    controller.listAll(req, res);
})


module.exports=router