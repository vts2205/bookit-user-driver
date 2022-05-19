
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carShifts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trip_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    driver_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'driver_id'
      }
    },
    customer_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    car_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'cars',
        key: 'car_id'
      }
    },
    payment_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'payments',
        key: 'payment_id'
      }
    },
    trip_request_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    pickup_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    drop_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trip_start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    trip_end_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    wait_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    customer_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    driver_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trip_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payment_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1-cash,2-wallet,3-razor_pay"
    },
    trip_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Success, Inprogress, Cancelled"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'car_shifts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
        ]
      },
      {
        name: "index",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "driver_id",
        using: "BTREE",
        fields: [
          { name: "driver_id" },
        ]
      },
      {
        name: "car_id",
        using: "BTREE",
        fields: [
          { name: "car_id" },
        ]
      },
      {
        name: "payment_id",
        using: "BTREE",
        fields: [
          { name: "payment_id" },
        ]
      },
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
