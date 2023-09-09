let { contas } = require('../src/bancodedados')

const atualizarConta = function (rec, res) {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const conta = contas.find(function (conta) {
        return conta.numero === numeroConta
    })
    if (!conta) {
        return res.status(404).json({ mensagem: "não existe conta para o numero informado" })
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: "informe ao menos um dos campos!" })
    }

    if (nome) {
        contas[Number(numeroConta) - 1].usuario.nome = nome
    }
    if (cpf) {
        const consultarCpf = contas.find(function (conta) {
            return conta.usuario.email === cpf
        })

        if (!consultarCpf) {
            contas[Number(numeroConta) - 1].usuario.cpf = cpf
        } else {
            return res.status(400).json({ mensagem: "já existe um usuario cadastrado com esse cpf!" })

        }

    }
    if (data_nascimento) {
        contas[Number(numeroConta) - 1].usuario.data_nascimento = data_nascimento

    }
    if (telefone) {
        contas[Number(numeroConta) - 1].usuario.telefone = telefone

    }
    if (email) {
        const consultarEmail = contas.find(function (conta) {
            return conta.usuario.email === email
        })

        if (!consultarEmail) {
            contas[Number(numeroConta) - 1].usuario.email = email
        } else {
            return res.status(400).json({ mensagem: "já existe um usuario cadastrado com esse email!" })

        }

    }
    if (senha) {
        contas[Number(numeroConta) - 1].usuario.senha = senha
    }

    return res.status(204).json({ mensagem: "dados atualizados com sucesso" })

}

module.exports = atualizarConta