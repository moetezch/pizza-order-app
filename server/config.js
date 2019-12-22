const config = {
  port: process.env.PORT || 8641,
  postgresql: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || '5432',
      database: process.env.POSTGRES_DB || 'pizzaapp',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1892',
    },
  },
}
module.exports = config
