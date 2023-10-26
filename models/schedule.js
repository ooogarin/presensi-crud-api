'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schedules.init({
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
      type: DataTypes.DATE,
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
  return schedules;
};