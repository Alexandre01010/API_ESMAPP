const express = require('express')
const router = express.Router();
const controllerAutores = require('../controllers/autor_controller')
const { validationResult, body } = require('express-validator')

router.route('/').get(controllerAutores.getAllAutor)

router.route('/:autorID').get(controllerAutores.getAutorById)

router.route('/').post([
    body('nome').notEmpty(),
    body('biografia').notEmpty(),
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerAutores.createAutor(req, res)
    }else{
        res.status(404).json({errors: errors.array()})
    }
})

module.exports=router
