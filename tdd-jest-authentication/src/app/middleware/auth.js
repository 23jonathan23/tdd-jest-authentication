const jwt = require('jsonwebtoken')
const { promisify } = require('util') //responsavél por tranformar o function do jwt em um promise

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ') //extrai somente o token do header sem o bearer

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}
