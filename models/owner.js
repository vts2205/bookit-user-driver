
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('owner', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    owner_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    driver_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'driver_id'
      }
    },
    aadhar_front: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    aadhar_back: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pan_card: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    passbook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rental_agreement1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rental_agreement2: {
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
    tableName: 'owner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "owner_id" },
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
    ]
  });
};
