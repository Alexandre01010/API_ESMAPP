const express = require('express')
const router = express.Router();
const controllerExposicoes = require('../controllers/exposicao_controller')
const { validationResult, body } = require('express-validator')



router.get('/', function (req, res) {
    controller.listAll(req, res);
})

router.route('/').post([
    body('nomeAutor').notEmpty(),
    body('pontos').notEmpty(),
    body('txtApresentacao').notEmpty(),
    body('QrCode').notEmpty(),
    body('numeroPiso').notEmpty()
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerExposicoes.createExpo(req, res)
    }else{
        res.status(404).json({errors: errors.array()})
    }
})

router.route('/:idExposicao').put([
    body('nomeAutor').notEmpty(),
    body('pontos').notEmpty(),
    body('txtApresentacao').notEmpty(),
    body('QrCode').notEmpty(),
    body('numeroPiso').notEmpty()
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerExposicoes.editExpo(req, res)
    }else{
        res.status(404).json({ errors: errors.array() })
    }
})


module.exports=router