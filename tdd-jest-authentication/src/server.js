const app = require('./app')

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT || 3000}`)
})
