const { banco } = require('./bancodedados')

const verificarSenha = function (req, res, next) {
    const { senha_banco } = req.query

    if (!senha_banco || senha_banco.trim() === '') {
        res.status(400).json({ mensagem: "a senha é obrigatória!" })
    }
    if (senha_banco === banco.senha) {
        next()
    } else {
        res.status(401).json({ mensagem: "senha incorreta" })
    }

}

module.exports = verificarSenha
