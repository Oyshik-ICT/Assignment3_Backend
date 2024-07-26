const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'p@stgress',
    port: 5433,
  })

  module.exports = pool;