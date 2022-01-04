const express = require('express')
const router = express.Router();
const controllerRespostas = require('../controllers/resposta_controller')
const { validationResult, body } = require('express-validator')


router.get('/', function (req, res) {
    controllerRespostas.listAll(req, res);
})

router.route('/:idPergunta').post([
    body('texto').notEmpty(),
    body('veracidade').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerRespostas.createResposta(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idResposta').put(controllerRespostas.editResposta)


module.exports = router