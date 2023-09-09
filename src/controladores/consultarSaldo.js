const { contas } = require('../src/bancodedados')

const consultarSaldo = function (req, res) {
    const { senha, numero_conta } = req.query

    if (!senha || !numero_conta) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios!" })
    }

    const buscarNumeroConta = contas.find(function (usuario) {
        return usuario.numero === numero_conta
    })

    if (!buscarNumeroConta) {
        return res.status(404).json({ mensagem: "informe um numero_conta válido!" })
    }

    if (buscarNumeroConta.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: "senha incorreta!" })
    }

    return res.json({ saldo: contas[Number(numero_conta) - 1].saldo })

}

module.exports = consultarSaldo