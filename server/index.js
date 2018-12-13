const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// setup db
let mongoDB = `mongodb://${host}:27017/todo`
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// import routes
let birds = require('./routes/birds')
let users = require('./routes/users')

// setup routes
app.use('/birds', birds)
app.use('/users', users)

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
