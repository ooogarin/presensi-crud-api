'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shift_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shift_type.init({
    id_shift_type: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type_sname: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    type_lname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status_shift_type: {
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
    modelName: 'shift_type',
    freezeTableName: true,
    timestamps: false
  });
  return shift_type;
};