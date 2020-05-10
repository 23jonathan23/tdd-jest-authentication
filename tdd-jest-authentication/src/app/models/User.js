const bcrypt = require('bcryptjs') // lib usada para criptografar a senha
const jwt = require('jsonwebtoken') //lib responsavél por gerar o token do usuario

//Configuração do modelo
module.exports = (sequelize, DataTypes) => {
  //Nome do modelo e o objeto de configuração dos campos
  const User = sequelize.define(
    'User',
    {
      //Campos do modelo e o tipo de cada
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL, //Esse campo não aparece no banco de dados, somente no model para fins de testes
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        },
      },
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  return User
}
