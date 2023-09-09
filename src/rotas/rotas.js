const express = require('express')
const rotas = express()
const app = require('../servidor')

const verificarSenha = require('../intermediarios/intermediarios')
const listarContas = require('../controladores/listarContas')
const adicionarConta = require('../controladores/adicionarConta')
const atualizarConta = require('../controladores/atualizarConta')
const deletarConta = require('../controladores/deletarConta')
const depositar = require('../controladores/depositar')
const transferir = require('../controladores/transferir')
const consultarSaldo = require('../controladores/consultarSaldo')
const sacar = require('../controladores/sacar')
const consultarExtrato = require('../controladores/consultarExtrato')

rotas.get('/contas', verificarSenha, listarContas)
rotas.get('/contas/saldo', consultarSaldo)
rotas.get('/contas/extrato', consultarExtrato)

rotas.post('/contas', adicionarConta)
rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/transferir', transferir)
rotas.post('/transacoes/sacar', sacar)

rotas.put('/contas/:numeroConta/usuario', atualizarConta)

rotas.delete('/contas/:numeroConta', deletarConta)


module.exports = rotas