const Pizza = require('../models/pizza')

exports.getAll = async (req, res) => {
  try {
    const pizzas = await Pizza.query()
    res.send(pizzas)
  } catch (error) {
    console.error(error)
  }
}
