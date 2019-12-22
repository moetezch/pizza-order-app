const Knex = require('knex')
const express = require('express')
const bodyParser = require('body-parser')
const promiseRouter = require('express-promise-router')
const routes = require('./routes/routes')
const { Model } = require('objection')
const config = require('./config.js')
const knex = Knex(config.postgresql)
Model.knex(knex)
const router = promiseRouter()

const app = express()
  .use(bodyParser.json())
  .use(router)
  .set('json spaces', 2)

routes(router)

// Basic objection.js error handler
app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {})
  } else {
    next()
  }
})

const server = app.listen(config.port, () => {
  console.log('server running at port %s', server.address().port)
})

app.stop = function() {
  server.close(function() {
    knex.destroy()
    console.log('shutting down server')
  })
}

module.exports = app
