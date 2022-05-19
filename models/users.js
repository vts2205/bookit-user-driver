
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    start_otp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_otp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    referral: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "INDEX",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
