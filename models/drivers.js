module.exports = function(sequelize, DataTypes) {
    return sequelize.define('drivers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        driver_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact: {
            type: DataTypes.STRING(20),
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
        current_car_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
            references: {
                model: 'cars',
                key: 'car_id'
            }
        },
        document_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
            references: {
                model: 'documents',
                key: 'document_id'
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
        owner_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        owner_number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        license_number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        expiry_date: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        rental_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "0-local,1-rental,2-outstation,3-tour"
        },
        ratings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        fcm_token: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        referral: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        driver_status: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "pending,confirmed,reconfirmation"
        },
        reason: {
            type: DataTypes.STRING(500),
            allowNull: true,

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
        tableName: 'drivers',
        timestamps: false,
        indexes: [{
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "driver_id" },
                ]
            },
            {
                name: "Index",
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "current_car_id",
                using: "BTREE",
                fields: [
                    { name: "current_car_id" },
                ]
            },
            {
                name: "document_id",
                using: "BTREE",
                fields: [
                    { name: "document_id" },
                ]
            },
            {
                name: "owner_id",
                using: "BTREE",
                fields: [
                    { name: "owner_id" },
                ]
            },
        ]
    });
};