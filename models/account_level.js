'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account_level.init({
    id_account_level: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      primaryKey: true
    },
    level_sname: {   
      type: DataTypes.INTEGER(11), // --> varchar(10)
      allowNull: false
    },
    level_lname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    level_description: {
      type: DataTypes.STRING(100),
      allowNull: false
    }, 
    status_account_level: {
      type: DataTypes.ENUM("ACT", "NACT"),
      allowNull: false,
      defaultValue: "ACT"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'account_level',
    freezeTableName: true,
    timestamps: false
  });
  return account_level;
};