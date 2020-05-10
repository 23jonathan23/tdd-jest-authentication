const { sequelize } = require('../../src/app/models')
//Responsável por percorrer todos os models dentro da pasta models
//e deletar os dados armazenados anteriormente
module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true })
    })
  )
}
