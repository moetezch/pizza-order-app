const BaseModel = require('./baseModel')

class OrderItem extends BaseModel {
  static get tableName() {
    return 'order_item'
  }

  static get relationMappings() {
    const Customer = require('./customer')
    const Order = require('./order')
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'order_item.customer_id',
          to: 'customer.id',
        },
      },
      order: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_item.order_id',
          to: 'placed_order.id',
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'pizza_id', 'size_id', 'quantity', 'total_price'],

      properties: {
        id: { type: 'integer' },
        order_id: { type: 'integer' },
        pizza_id: { type: 'integer' },
        size_id: { type: 'integer' },
        quantity: { type: 'integer' },
        total_price: { type: 'number' },
      },
    }
  }
}

module.exports = OrderItem
