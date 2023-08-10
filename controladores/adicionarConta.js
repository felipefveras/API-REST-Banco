let { contas } = require('../src/bancodedados')
let id = contas.length + 1

const adicionarConta = function (req, res) {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    if (!nome || nome.trim() === '' || !cpf || cpf.trim() === '' || !telefone || telefone.trim() === '' || !email || email.trim() === '' || !senha || senha.trim() === '') {
        res.status(400).json({ mensagem: "todos os campos são obrigatórios!" })
    }

    const buscarCpf = contas.find(function (conta) {
        return conta.usuario.cpf === cpf
    })

    if (buscarCpf) {
        return res.status(404).json({ mensagem: "cpf já cadastrado!" })
    }

    const buscarEmail = contas.find(function (usuario) {
        return usuario.usuario.email === email
    })

    if (buscarEmail) {
        return res.status(404).json({ mensagem: "email já cadastrado!" })
    }

    let novoUsuario = {
        numero: id.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novoUsuario)

    id = Number(id) + 1
    return res.status(201).json(contas[id - 2])
}

module.exports = adicionarConta