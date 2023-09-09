const { contas, banco, depositos } = require('../src/bancodedados')
const { format } = require('date-fns')

let data = format(new Date(), "y/M/d H:m:ss")

const depositar = function (req, res) {
    const { numero_conta, valor } = req.body

    const conta = contas.find(function (usuario) {
        return usuario.numero === numero_conta
    })

    if (Number(numero_conta) > contas.length || Number(numero_conta) <= 0) {
        return res.status(400).json({ mensagem: "informe um numero_conta válido!" })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "informe um valor de depósito válido!" })
    }

    contas[Number(numero_conta) - 1].saldo = contas[Number(numero_conta) - 1].saldo + valor

    depositos.push({
        data,
        numero_conta,
        valor
    })

    return res.status(201).json({ depositos })
}

module.exports = depositar