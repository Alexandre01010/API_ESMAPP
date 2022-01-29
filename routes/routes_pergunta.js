const express = require('express')
const router = express.Router();
const controllerPerguntas = require('../controllers/pergunta_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /pergunta
 * @group Perguntas
 * @returns {object} 200 - An array of Perguntas info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route POST /pergunta/{idExposicao}
 * @group Perguntas
 * @param {object} object.body - Pergunta - eg. {"texto": "Em que ano foi pintada a obra Kizhinga?", "pontos": 19}
 * @returns {object} 200 - An array of Perguntas info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route PUT /pergunta/{idPergunta}
 * @group Perguntas
 * @param {string} idPergunta.path - id da Pergunta
 * @returns {object} 200 OK
 * @returns {Error} 404 - Error array
 * @security Bearer
 */
/**
 * @route DELETE /pergunta/{idPergunta}
 * @group Perguntas
 * @param {string} idPergunta.path - id da Pergunta
 * @returns {object} 200 OK
 * @returns {Error} 404 - Error array
 * @security Bearer
 */




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