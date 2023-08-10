const { contas, usuario } = require('../src/bancodedados')

const deletarConta = function (req, res) {
    const { numeroConta } = req.params
    const conta = contas.find(function (usuario) {
        return usuario.numero === numeroConta
    })

    if (Number(numeroConta) > contas.length || Number(numeroConta) <= 0) {
        return res.status(400).json({ mensagem: "informe um numeroConta válido" })
    }
    if (!conta) {
        return res.status(404).json({ mensagem: "a conta não existe" })
    }

    if (contas[Number(numeroConta) - 1].saldo > 0) {
        return res.status(400).json({ mensagem: "conta não deletada, pois ainda possui saldo" })
    }
    const indice = contas.findIndex(function (elemento) {
        return elemento.numero === numeroConta
    })

    contas.splice(indice, 1)

    return res.status(200).send({ mensagem: "conta excluida com sucesso" })
}

module.exports = deletarConta