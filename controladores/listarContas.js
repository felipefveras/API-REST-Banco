
let { contas } = require('../src/bancodedados')


const listarContas = function (req, res) {
    if (!contas) {
        return res.status(204).json()
    } else {
        return res.status(200).json(contas)
    }

}

module.exports = listarContas 