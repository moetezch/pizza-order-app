const BaseModel = require('./baseModel')
const Customer = require('./customer')
const OrderItem = require('./orderItem')
class Order extends BaseModel {
  async $afterFind(queryContext) {
    const {
      address,
      zip_code,
      city,
      phone,
      name,
    } = await Customer.query().findById(this.customer_id)
    this.costumer = { address, zip_code, city, phone, name }
    const orderItems = await OrderItem.query()
      .where('order_id', '=', this.id)
      .join('pizza', 'order_item.pizza_id', '=', 'pizza.id')
      .join('pizza_size', 'order_item.size_id', '=', 'pizza_size.id')
      .select(
        'type',
        'order_item.id',
        'size',
        'quantity',
        'total_price',
        'created_at',
        'updated_at'
      )
    this.orderItems = orderItems
  }

  static get tableName() {
    return 'placed_order'
  }

  static get relationMappings() {
    const Customer = require('./customer')
    const OrderItem = require('./orderItem')
    return {
      customer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'placed_order.customer_id',
          to: 'customer.id',
        },
      },
      orderItems: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'placed_order.id',
          to: 'order_item.order_id',
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['customer_id', 'status', 'total_price'],

      properties: {
        id: { type: 'integer' },
        customer_id: { type: 'integer' },
        status: { type: 'string' },
        total_price: { type: 'number' },
      },
    }
  }
}

module.exports = Order
