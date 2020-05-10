//configuração da lib dotenv responsável por controlar as variaveis ambientes
//Carregando as variaveis ambientes
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const express = require('express')
const routes = require('./routes')

server = express()

server.use(express.json())

server.use(routes)

module.exports = server
