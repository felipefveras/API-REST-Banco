const { contas, transferencias } = require('../src/bancodedados')
const { format } = require('date-fns')

let data = format(new Date(), "y/M/d H:m:ss")

const transferir = function (req, res) {
    const { numero_conta_origem, numero_conta_destino, senha, valor } = req.body

    const buscarContaDestino = contas.find(function (usuario) {
        return usuario.numero === numero_conta_destino
    })

    if (!buscarContaDestino) {
        return res.status(404).json({ mensagem: "informe um numero_conta_destino válido!" })
    }

    const buscarContaOrigem = contas.find(function (usuario) {
        return usuario.numero === numero_conta_origem
    })

    if (!buscarContaOrigem) {
        return res.status(404).json({ mensagem: "informe um numero_conta_origem válido!" })
    }

    if (buscarContaOrigem.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: "senha incorreta para a conta origem!" })
    }

    if (valor > buscarContaOrigem.saldo) {
        return res.status(400).json({ mensagem: "valor superior ao saldo em conta!" })
    }

    contas[Number(numero_conta_origem) - 1].saldo = contas[Number(numero_conta_origem) - 1].saldo - valor
    contas[Number(numero_conta_destino) - 1].saldo = contas[Number(numero_conta_destino) - 1].saldo + valor

    transferencias.push({
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    })

    return res.json(contas)
}

module.exports = transferir

