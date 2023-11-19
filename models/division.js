'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // shifting
      division.hasMany(models.shifting, {
        foreignKey: 'id_division'
      });
    }
  }
  division.init({
    id_division: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    division_sname: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "-"
    },
    division_lname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "-"
    },
    division_description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "-"
    },
    status_division: {
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
    modelName: 'division',
    freezeTableName: true,
    timestamps: false
  });
  return division;
};