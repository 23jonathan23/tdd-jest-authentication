const bcrypt = require('bcryptjs') // lib usada para criptografar a senha

const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Jonathan',
      email: 'jonathan@gmail.com',
      password: '12345',
    })

    const compareHash = await bcrypt.compare('12345', user.password_hash)

    expect(compareHash).toBe(true)
  })
})
