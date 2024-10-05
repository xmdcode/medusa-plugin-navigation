const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "xristos",
  password: "1234",
  database: "medusa",
  // synchronize: false,
  entities: [
    "dist/models/*.js",
    // 'node_modules/@medusajs/medusa/dist/models/!(*.index.js)',
  ],
  migrations: [
    "dist/migrations/*.js",
    // 'node_modules/@medusajs/medusa/dist/migrations/*.js',
  ],
})

module.exports = {
  datasource: AppDataSource,
}