'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account_device.init({
    id_device_account: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    imei: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    manufacture: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "-"
    },
    model: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "-"
    },
    release_vesion: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "-"
    },
    sdk_version: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "-"
    },
    app_version: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    datetime_created: {
      allowNull: false,
      type: DataTypes.DATE
    },
    datetime_edited: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'account_device',
    freezeTableName: true,
    timestamps: false
  });
  return account_device;
};