module.exports = router => {
  const ordersController = require('../controllers/orders')
  const { check, validationResult } = require('express-validator')
  router.post(
    '/api/orders',
    [
      check('customer_name', 'Your name is not valid')
        .isLength({ min: 3 })
        .isString(),
      check('customer_zip_code', 'Your zip code is not valid').isNumeric(),
      check('customer_address', 'Your address is not valid')
        .isLength({ min: 3 })
        .isString(),
      check('customer_city', 'Your city is not valid')
        .isLength({ min: 3 })
        .isString(),
      check('customer_phone', 'Your phone is not valid')
        .isLength({ min: 8 })
        .isString(),
      check('pizzas', 'Order must not be empty').isArray({ min: 1 }),
    ],
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      next()
    },
    ordersController.create
  )
  router.get('/api/orders', ordersController.getAll)
  router.get('/api/orders/:id', ordersController.getById)
  router.delete('/api/orders/:id', ordersController.delete)
  router.put(
    '/api/orders/:id',
    [
      check('status', 'Status is not valid')
        .optional()
        .isString()
        .isIn(['preparing', 'delivering', 'delivered']),
      check('pizzas', 'Order must not be empty')
        .isArray({ min: 1 })
        .optional(),
    ],
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      next()
    },
    ordersController.update
  )

  const pizzasController = require('../controllers/pizzas')

  router.get('/api/pizzas', pizzasController.getAll)

  if (process.env.NODE_ENV === 'production') {
    const express = require('express')
    const path = require('path')
    router.use(express.static(path.join(__dirname, '../../client/build')))
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
    })
  }
}
