'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // from shifting
      schedule.belongsTo(models.shifting, {
        foreignKey: 'id_shifting',
        as: 'shifting'
      });

      // from account
      schedule.belongsTo(models.account, {
        foreignKey: 'id_account',
        as: 'account'
      });

      // to attendance
      schedule.hasMany(models.attendance, {
        foreignKey: 'id_schedule'
      });

      // to locator
      schedule.hasOne(models.locator, {
        foreignKey: 'id_locator'
      });
    }
  }
  schedule.init({
    id_schedule: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_account: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_shifting: {
      type: DataTypes.UUID,
      allowNull: false
    },
    shift_schedule: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status_schedule: {
      type: DataTypes.ENUM("ACT", "NACT"),
      allowNull: false,
      defaultValue: "ACT"
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
    modelName: 'schedule',
    freezeTableName: true,
    timestamps: false
  });
  return schedule;
};