'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shift_turn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shift_turn.init({
    id_shift_turn: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    turn_sname: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    turn_lname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    turn_description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status_shift_turn: {
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
    modelName: 'shift_turn',
    freezeTableName: true,
    timestamps: false
  });
  return shift_turn;
};