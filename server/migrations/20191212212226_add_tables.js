exports.up = async function(knex) {
  await knex.schema.createTable('customer', function(table) {
    table.increments('id').primary()
    table.string('name')
    table.string('address')
    table.string('city')
    table.integer('zip_code')
    table.string('phone')
    table.timestamps()
  })

  await knex.schema.createTable('placed_order', function(table) {
    table.increments('id').primary()
    table
      .integer('customer_id')
      .unsigned()
      .references('customer.id')
    table.enu('status', ['new', 'preparing', 'delivering', 'delivered'])
    table.decimal('total_price', 12, 2)
    table.timestamps()
  })
  await knex.schema.createTable('pizza', function(table) {
    table.increments('id').primary()
    table.string('type')
    table.text('ingredients')
  })

  await knex.schema.createTable('pizza_size', function(table) {
    table.increments('id').primary()
    table.string('size')
  })

  await knex.schema.createTable('pizza_price', function(table) {
    table.increments('id').primary()
    table
      .integer('pizza_id')
      .unsigned()
      .references('pizza.id')
    table
      .integer('size_id')
      .unsigned()
      .references('pizza_size.id')
    table.decimal('price', 4, 2)
  })

  await knex.schema.createTable('order_item', function(table) {
    table.increments('id').primary()
    table
      .integer('order_id')
      .unsigned()
      .references('placed_order.id')
    table
      .integer('pizza_id')
      .unsigned()
      .references('pizza.id')
    table
      .integer('size_id')
      .unsigned()
      .references('pizza_size.id')
    table.integer('quantity').unsigned()
    table.decimal('total_price', 12, 2)
    table.timestamps()
  })

  await knex('pizza').insert([
    {
      type: 'viennese',
      ingredients: 'tomato, mozzarella, German sausage, oregano, oil',
    },
    {
      type: 'romana',
      ingredients: 'tomato, mozzarella, anchovies, oregano, oi',
    },
    {
      type: 'capricciosa',
      ingredients:
        'mozzarella, tomato, mushrooms, artichokes, cooked ham, olives, oil',
    },
    {
      type: 'Napolitana',
      ingredients: 'tomato sauce, anchovies, olives, capers',
    },
  ])

  await knex('pizza_size').insert([
    { size: 'small' },
    { size: 'medium' },
    { size: 'large' },
  ])

  await knex('pizza_price').insert([
    { pizza_id: 1, size_id: 1, price: 8 },
    { pizza_id: 1, size_id: 2, price: 10.5 },
    { pizza_id: 1, size_id: 3, price: 12 },
    { pizza_id: 2, size_id: 1, price: 9.5 },
    { pizza_id: 2, size_id: 2, price: 11.5 },
    { pizza_id: 2, size_id: 3, price: 13 },
    { pizza_id: 3, size_id: 1, price: 10 },
    { pizza_id: 3, size_id: 2, price: 12 },
    { pizza_id: 3, size_id: 3, price: 15 },
    { pizza_id: 4, size_id: 1, price: 7.5 },
    { pizza_id: 4, size_id: 2, price: 9 },
    { pizza_id: 4, size_id: 3, price: 11.5 },
  ])
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('order_item')
  await knex.schema.dropTable('pizza_price')
  await knex.schema.dropTable('pizza_size')
  await knex.schema.dropTable('pizza')
  await knex.schema.dropTable('placed_order')
  await knex.schema.dropTable('customer')
}
