'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attendances.init({
    id_attendance: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_account: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_schedule: {
      type: DataTypes.UUID,
      defaultValue: null
    },
    event_name: {
      type: DataTypes.ENUM("LOGIN", "START", "END"),
      allowNull: false,
      defaultValue: "LOGIN"
    },
    locator_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    locator_latitude: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    locator_longitude: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    selfie: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "-"
    },
    latitude: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "-"
    },
    longitude: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "-"
    },
    reason: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    date_attend: {
      type: DataTypes.DATE,
      allowNull: null
    },
    datetime_record: {
      type: DataTypes.DATE,
      allowNull: false
    },
    datetime_created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'attendance',
    freezeTableName: true,
    timestamps: false
  });
  return attendances;
};