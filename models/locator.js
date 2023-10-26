'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  locator.init({
    id_locator: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_shifting: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_schedule: {
      type: DataTypes.UUID,
      defaultValue: null
    },
    locator_code: {
      type: DataTypes.STRING(45),
      allowNull: false
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
    use_location: {
      type: DataTypes.ENUM("Y", "N"),
      allowNull: false,
      defaultValue: "Y"
    },
    status_locator: {
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
    modelName: 'locator',
    freezeTableName: true,
    timestamps: false
  });
  return locator;
};