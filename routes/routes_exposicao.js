const express = require('express')
const router = express.Router();
const controllerExposicoes = require('../controllers/exposicao_controller')
const { validationResult, body } = require('express-validator')


/**
 * @route GET /exposicao
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

/**
 * @route POST /exposicao
 * @group Exposições
 * @param {object} object.body - Exposição - eg. {"txtApresentacao": "O amor é fogo que arde sem se ver", "pontos": 19, "tituloExposicao": "The Witch", "numeroPiso": 9,"img": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==","autorId": 12}
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */



/**
 * @route PUT /exposicao/{idExposicao}
 * @group Exposições
 * @param {string} idExposicao.path - id da Exposição
 * @param {object} object.body - Exposição eg.  {"QrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKcSURBVO3BQa7jSAwFwXyE7n/lHC+5KkCQ7flmMyK+sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUNJ+CaVLgnvpNIl4ZtUnijWKMUapVijXLyZyjsl4Q6VLgmdyhMq75SEdyrWKMUapVijXHxYEu5Q+SVJuEPlk4o1SrFGKdYoFz9OpUvCSRI6lUmKNUqxRinWKBc/LgmdSpeEkyR0Kr+sWKMUa5RijXLxYSqfpNIl4UTlnVT+kmKNUqxRijXKxZsl4ZuS0Kl0SThJQqdykoS/rFijFGuUYo0SXxgkCScqkxVrlGKNUqxRLh5KQqdykoRvUumS0Kl0SehUTpLQqXRJuEPliWKNUqxRijVKfOGHJaFTOUnCiUqXhE7lLyvWKMUapVijxBceSMI3qZwk4Z1U7kjCEypPFGuUYo1SrFEuHlLpktCpdEnoVLokdCpdEk5U7kjCE0noVLokdCqfVKxRijVKsUa5eCgJncoTKl0STlROkvBNSehUTpLQqTxRrFGKNUqxRrl4SOUOlTtUTpJwh0qXhDuScEcSOpVPKtYoxRqlWKNcPJSEb1I5UTlJQqfSJeFEpUvCEyrvVKxRijVKsUa5eDOVd0rCHUk4UTlR6ZJwh0qXhC4JJypPFGuUYo1SrFEuPiwJd6g8odIl4ZuS0Kl8U7FGKdYoxRrl4h+XhDtUTpLQJaFT+aRijVKsUYo1ysWPU7kjCXeonCThjiScqDxRrFGKNUqxRrn4MJX/k0qXhBOVkyT8ZcUapVijFGuU+MIDSfgmlS4JJyonSThROUnCHSqfVKxRijVKsUaJL6wxijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKN8h8r3fbnZPho4QAAAABJRU5ErkJggg==","pontos": 19,"tituloExposicao": "Titulo editado","numeroPiso": 9,"txtApresentacao": "txt editado","img": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==","dataInicio": null,"dataFim": null,"createdAt": "2022-02-07T16:08:38.000Z","updatedAt": "2022-02-07T16:08:38.000Z","autorId": 12}
 * @returns {object} 200
 * @returns {Error} 404 - Error array
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route DELETE /exposicao/{idExposicao}
 * @group Exposições
 * @param {string} idExposicao.path - id da Exposição
 * @returns {object} 200 
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route GET /exposicao/temporaria
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route GET /exposicao/permanente
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */


router.get('/', function (req, res) {
    controllerExposicoes.getExposicaoFiltered(req, res);
})

router.route('/').post([
    
    body('txtApresentacao').notEmpty(),
    body('numeroPiso').notEmpty(),
    body('tituloExposicao').notEmpty
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerExposicoes.createExpo(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idExposicao').put([
    
    body('txtApresentacao').notEmpty(),
   
    body('numeroPiso').notEmpty(),
    body('tituloExposicao').notEmpty
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerExposicoes.editExpo(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idExposicao').delete(controllerExposicoes.deleteExpo)

router.route('/temporaria').get(controllerExposicoes.getTemporaryExpositions)

router.route('/permanente').get(controllerExposicoes.getPermanentExpositions)


module.exports = router