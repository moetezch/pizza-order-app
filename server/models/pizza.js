const { Model } = require('objection')
const PizzaPrice = require('./pizza_price')
class Pizza extends Model {
  async $afterFind(queryContext) {
    const prices = await PizzaPrice.query()
      .where('pizza_id', '=', this.id)
      .select('size_id', 'price')
    this.prices = prices
  }

  static get tableName() {
    return 'pizza'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type', 'ingredients'],

      properties: {
        id: { type: 'integer' },
        type: { type: 'string' },
        ingredients: { type: 'string' },
      },
    }
  }
}

module.exports = Pizza
