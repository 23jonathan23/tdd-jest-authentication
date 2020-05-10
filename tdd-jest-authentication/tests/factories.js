const faker = require('faker') //lib para gerar dados ficticíos
const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

module.exports = factory
