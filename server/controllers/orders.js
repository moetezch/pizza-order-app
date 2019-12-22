const PizzaPrice = require('../models/pizza_price')
const Customer = require('../models/customer')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const createError = require('../errors/errors')

exports.create = async (req, res) => {
  const {
    customer_name,
    customer_address,
    customer_city,
    customer_phone,
    customer_zip_code,
    pizzas,
  } = req.body
  const client = await Customer.query()
    .insert({
      name: customer_name,
      address: customer_address,
      city: customer_city,
      zip_code: customer_zip_code,
      phone: customer_phone,
    })
    .returning('*')
  if (!client) {
    throw createError('can not create a new client', 400)
  }

  const order = await Order.query().insert({
    customer_id: client.id,
    status: 'new',
    total_price: 0,
  })

  if (!order) {
    throw createError('can not create a new order', 400)
  }

  if (pizzas.length < 1) {
    throw createError('you have not selected any pizza', 400)
  }

  for (const pizza of pizzas) {
    await createNewPizzaOrder(pizza, order.id)
  }
  const totalPrice = await calculateOrderTotalPrice(order.id)
  const updatedOrder = await Order.query().patchAndFetchById(order.id, {
    total_price: totalPrice,
  })
  res.send(updatedOrder)
}

exports.getAll = async (req, res) => {
  const orders = await Order.query().modify(function(queryBuilder) {
    if (req.query.status) {
      queryBuilder.where('status', '=', req.query.status)
    }
    if (req.query.customer_id) {
      queryBuilder.where('customer_id', '=', req.query.customer_id)
    }
  })
  res.send(orders)
}

exports.getById = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const order = await Order.query().findById(id)
  if (!order) {
    throw createError('order not found', 404)
  }
  res.send(order)
}

exports.delete = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const order = await Order.query().findById(id)
  if (!order) {
    throw createError('order not found', 404)
  }
  await OrderItem.query()
    .delete()
    .where('order_id', '=', order.id)
  await Order.query().deleteById(id)
  res.sendStatus(204)
}

exports.update = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const order = await Order.query().findById(id)
  if (!order) {
    throw createError('order not found', 404)
  }
  if (order.status === 'delivering' || order.status === 'delivered') {
    throw createError('order is already delivered', 400)
  }

  if (order.status === 'delivering') {
    if (req.body.status === 'delivered') {
      const updatedOrder = await Order.query().patchAndFetchById(id, {
        status: req.body.status,
      })
      res.send(updatedOrder)
    } else {
      throw createError('order can not be updated', 400)
    }
  }

  if (order.status === 'new') {
    await OrderItem.query()
      .delete()
      .where('order_id', '=', order.id)

    for (const pizza of req.body.pizzas) {
      await createNewPizzaOrder(pizza, order.id)
    }

    const totalPrice = await calculateOrderTotalPrice(order.id)
    const updatedOrder = await Order.query().patchAndFetchById(id, {
      status: req.body.status,
      total_price: totalPrice,
    })
    res.send(updatedOrder)
  }

  if (order.status === 'preparing') {
    const oldOrderItems = await order.$relatedQuery('orderItems')
    for (const pizza of req.body.pizzas) {
      const item = oldOrderItems.find(
        OrderItem =>
          OrderItem.pizza_id == pizza.pizza_id &&
          OrderItem.size_id == pizza.size_id
      )
      if (!item) {
        await createNewPizzaOrder(pizza, order.id)
      } else {
        if (item.quantity < pizza.quantity) {
          await OrderItem.query().patchAndFetchById(item.id, {
            quantity: pizza.quantity,
          })
        }
      }
    }
    const totalPrice = await calculateOrderTotalPrice(order.id)
    const updates = {
      total_price: totalPrice,
    }
    if (req.body.status !== 'new') {
      updates.status = req.body.status
    }
    const updatedOrder = await Order.query().patchAndFetchById(id, updates)
    res.send(updatedOrder)
  }
}

async function createNewPizzaOrder(pizza, orderId) {
  const { pizza_id, size_id, quantity } = pizza
  const pizzaPrice = await PizzaPrice.query()
    .where('pizza_id', '=', pizza_id)
    .andWhere('size_id', '=', size_id)
  const totalPrice = pizzaPrice[0].price * quantity
  await OrderItem.query().insert({
    order_id: orderId,
    pizza_id,
    size_id,
    quantity,
    total_price: totalPrice,
  })
}

async function calculateOrderTotalPrice(orderId) {
  const totalPrice = await OrderItem.query()
    .where('order_id', '=', orderId)
    .sum('total_price')
  return parseFloat(totalPrice[0].sum)
}
