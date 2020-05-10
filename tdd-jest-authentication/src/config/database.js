//configuração da lib dotenv responsável por controlar as variaveis ambientes
//Carregando as variaveis ambientes
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './tests/database.sqlite', //Caminho para banco sqlite usadado para teste
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true, //força a criação de um campo createdAt e updatedAt
    underscored: true, //define que o nome dos models será com underline e não came case
    underscoredAll: true, //aplica a mesma configuração porem para os campos da tabela
  },
}
