const { User } = require('../models')

const SessionController = {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } }) //consulta no banco

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    return res.json({ user, token: user.generateToken() })
  },
}

module.exports = SessionController
