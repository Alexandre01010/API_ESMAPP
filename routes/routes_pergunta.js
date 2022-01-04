const express = require('express')
const router = express.Router();
const controllerPerguntas = require('../controllers/pergunta_controller')
const { validationResult, body } = require('express-validator')



router.get('/', function (req, res) {
    controllerPerguntas.listAll(req, res);
})

router.route('/:idExposicao').post([
    body('texto').notEmpty(),
    body('pontos').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerPerguntas.createPergunta(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idPergunta').put(controllerPerguntas.editPergunta)
router.route('/:idPergunta').delete(controllerPerguntas.deletePergunta)


module.exports = router