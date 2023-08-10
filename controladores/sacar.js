const { contas, saques } = require('../src/bancodedados')
const { format } = require('date-fns')

let data = format(new Date(), "y/M/d H:m:ss")

const sacar = function (req, res) {
    const { numero_conta, valor, senha } = req.body

    const buscarNumeroConta = contas.find(function (usuario) {
        return usuario.numero === numero_conta
    })

    if (!buscarNumeroConta) {
        return res.status(404).json({ mensagem: "informe um numero_conta válido!" })
    }

    if (buscarNumeroConta.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: "senha incorreta para a conta origem!" })
    }

    if (valor > buscarNumeroConta.saldo) {
        return res.status(400).json({ mensagem: "valor superior ao saldo em conta!" })
    }

    contas[Number(numero_conta) - 1].saldo = contas[Number(numero_conta) - 1].saldo - valor

    saques.push({
        data,
        numero_conta,
        valor
    })

    return res.json(saques)
}

module.exports = sacar