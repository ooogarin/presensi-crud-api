'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const cuti_type = require('./cuti_type');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // to schedule
      account.hasMany(models.schedule, {
        foreignKey: 'id_account'
      });
      
      // to attendance
      account.hasMany(models.attendance, {
        foreignKey: 'id_account',
      });

      // to cuti
      account.hasMany(models.cuti, {
        foreignKey: 'id_account'
      });

      // from role
      account.belongsTo(models.role, {
        foreignKey: 'id_role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'role'
      });
    }
  }
  account.init({
    id_account: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    sname_user: {
      type: DataTypes.STRING(20)
    },
    lname_user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "no_image.png"
    },
    id_account_level: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    id_role: {
      type: DataTypes.UUID
    },
    status_account: {
      type: DataTypes.ENUM("ACT", "NACT"),
      allowNull: false,
      defaultValue: "ACT"
    },
    token: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    imei: {
      type: DataTypes.STRING(30),
      defaultValue: "-"
    },
    fcm_id: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    datetime_created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    datetime_edited: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'account',
    freezeTableName: true,
    timestamps: false
  });
  return account;
};
