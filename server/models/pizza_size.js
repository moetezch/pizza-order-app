const { Model } = require('objection')

class PizzaSize extends Model {
  static get tableName() {
    return 'pizza_size'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['size'],
      properties: {
        id: { type: 'integer' },
        size: { type: 'string' },
      },
    }
  }
}

module.exports = PizzaSize
