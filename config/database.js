const { Sequelize } = require('sequelize')

console.log(process.env.DB_HOST)
console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

module.exports.taxiDatabase = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: 0,
  define: {
    timestamps: false
  },
  // dialectOptions: {
  //   connectTimeout: 60000
  // },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})



// module.exports.taxiDatabase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//    host: process.env.DB_HOST,
//   dialect: 'mysql',
//   operatorsAliases: 0,
//   define: {
//     timestamps: false
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })
