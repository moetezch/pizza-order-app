const allConf = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRESQL_HOST || 'localhost',
    port: process.env.POSTGRESQL_PORT || '5432',
    database: process.env.POSTGRESQL_DATABASE || 'pizzaapp',
    user: process.env.POSTGRESQL_USER || 'postgres',
    password: process.env.POSTGRESQL_PASSWORD || '1892',
  },
  migrations: {
    tableName: 'knex_migrations',
    transaction: true,
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  debug: false,
}

module.exports = {
  development: allConf,
  production: allConf,
}
