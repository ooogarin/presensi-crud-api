'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cuti.init({
    id_cuti: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_account: {
      type: DataTypes.UUID
    },
    cuti_description: {
      type: DataTypes.STRING(200)
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
    modelName: 'cuti',
    freezeTableName: true,
    timestamps: false
  });
  return cuti;
};