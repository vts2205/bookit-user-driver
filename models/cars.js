
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cars', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    car_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    driver_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'drivers',
        key: 'driver_id'
      }
    },
    owner_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'owner',
        key: 'owner_id'
      }
    },
    car_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "0-mini,1-sedan,2-xuv"
    },
    car_register_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    front_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    chase_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rc_front: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rc_back: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    insurance: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fc: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'cars',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "car_id" },
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
        name: "owner_id",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
      {
        name: "cars_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "driver_id" },
        ]
      },
    ]
  });
};
