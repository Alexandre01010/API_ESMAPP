const express = require('express')
const router = express.Router();
const controllerObras = require('../controllers/obra_controller')
const { validationResult, body } = require('express-validator')



router.get('/', function (req, res) {
    controllerObras.listAll(req, res);
})

router.route('/:idExposicao').post([
    body('QrCode').notEmpty(),
    body('pontos').notEmpty(),
    body('img').notEmpty(),
    body('titulo').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerObras.createObra(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idObra').put([
    body('QrCode').notEmpty(),
    body('pontos').notEmpty(),
    body('img').notEmpty(),
    body('titulo').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerObras.editObra(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idObra').delete(controllerObras.deleteObra)


module.exports = router