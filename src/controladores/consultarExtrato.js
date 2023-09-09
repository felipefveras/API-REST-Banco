const { contas, transferencias, saques, depositos } = require('../src/bancodedados')

const consultarExtrato = function (req, res) {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatórios!" })
    }
    let buscarConta = contas.find(function (usuario) {
        return usuario.numero === numero_conta
    })

    if (!buscarConta) {
        return res.status(404).json({ mensagem: "informe um numero_conta válido!" })
    }

    if (buscarConta.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: "senha incorreta!" })
    }

    let depositosUsuario = depositos.filter(function (elemento) {
        return elemento.numero_conta === numero_conta
    })

    let saquesUsuario = saques.filter(function (elemento) {
        return elemento.numero_conta === numero_conta
    })

    let transferenciasEnviadas = transferencias.filter(function (elemento) {
        return elemento.numero_conta_origem === numero_conta
    })

    let transferenciasRecebidas = transferencias.filter(function (elemento) {
        return elemento.numero_conta_destino === numero_conta
    })

    return res.json({ depositosUsuario, saquesUsuario, transferenciasEnviadas, transferenciasRecebidas })
}

module.exports = consultarExtrato