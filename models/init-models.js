var DataTypes = require("sequelize").DataTypes;
var _carShifts = require("./car_shifts");
var _cars = require("./cars");
var _documents = require("./documents");
var _drivers = require("./drivers");
var _owner = require("./owner");
var _packages = require("./packages");
var _payments = require("./payments");
var _users = require("./users");

function initModels() {
  var sequelize = require('../config/database').taxiDatabase
  var carShifts = _carShifts(sequelize, DataTypes);
  var cars = _cars(sequelize, DataTypes);
  var documents = _documents(sequelize, DataTypes);
  var drivers = _drivers(sequelize, DataTypes);
  var owner = _owner(sequelize, DataTypes);
  var packages = _packages(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  carShifts.belongsTo(cars, { as: "car", foreignKey: "car_id"});
  cars.hasMany(carShifts, { as: "car_shifts", foreignKey: "car_id"});
  drivers.belongsTo(cars, { as: "current_car", foreignKey: "current_car_id"});
  cars.hasMany(drivers, { as: "current_car_drivers", foreignKey: "current_car_id"});
  drivers.belongsTo(documents, { as: "document_document", foreignKey: "document_id"});
  documents.hasMany(drivers, { as: "document_drivers", foreignKey: "document_id"});
  carShifts.belongsTo(drivers, { as: "driver", foreignKey: "driver_id"});
  drivers.hasMany(carShifts, { as: "car_shifts", foreignKey: "driver_id"});
  cars.belongsTo(drivers, { as: "driver", foreignKey: "driver_id"});
  drivers.hasMany(cars, { as: "cars", foreignKey: "driver_id"});
  documents.belongsTo(drivers, { as: "driver", foreignKey: "driver_id"});
  drivers.hasMany(documents, { as: "documents", foreignKey: "driver_id"});
  owner.belongsTo(drivers, { as: "driver_driver", foreignKey: "driver_id"});
  drivers.hasMany(owner, { as: "driver_owners", foreignKey: "driver_id"});
  cars.belongsTo(owner, { as: "owner", foreignKey: "owner_id"});
  owner.hasMany(cars, { as: "cars", foreignKey: "owner_id"});
  drivers.belongsTo(owner, { as: "owner", foreignKey: "owner_id"});
  owner.hasMany(drivers, { as: "drivers", foreignKey: "owner_id"});
  carShifts.belongsTo(payments, { as: "payment", foreignKey: "payment_id"});
  payments.hasMany(carShifts, { as: "car_shifts", foreignKey: "payment_id"});
  carShifts.belongsTo(users, { as: "customer", foreignKey: "customer_id"});
  users.hasMany(carShifts, { as: "car_shifts", foreignKey: "customer_id"});

  return {
    carShifts,
    cars,
    documents,
    drivers,
    owner,
    packages,
    payments,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
