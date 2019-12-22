const BaseModel = require('./baseModel')

class Customer extends BaseModel {
  static get tableName() {
    return 'customer'
  }

  static get relationMappings() {
    const Order = require('./order')
    return {
      orders: {
        relation: BaseModel.HasManyRelation,
        modelClass: Order,
        join: {
          from: 'customer.id',
          to: 'order.costumer_id',
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'address', 'city', 'zip_code', 'phone'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        zip_code: { type: 'integer' },
        phone: { type: 'string' },
      },
    }
  }
}

module.exports = Customer
