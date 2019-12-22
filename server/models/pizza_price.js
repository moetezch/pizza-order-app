const { Model } = require('objection')

class PizzaPrice extends Model {
  static get tableName() {
    return 'pizza_price'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['pizza_id', 'size_id', 'price'],

      properties: {
        id: { type: 'integer' },
        size_id: { type: 'integer' },
        pizza_id: { type: 'integer' },
        price: { type: 'number' },
      },
    }
  }
}

module.exports = PizzaPrice
