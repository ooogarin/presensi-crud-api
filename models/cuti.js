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
      // from account
      cuti.belongsTo(models.account, {
        foreignKey: 'id_account',
        as: 'account'
      });

      // from cuti_type
      cuti.belongsTo(models.cuti_type, {
        foreignKey: 'id_cuti_type',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'cuti_type'
      });
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
    cuti_start: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    cuti_end: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    id_cuti_type: {
      type: DataTypes.UUID,
    },
    cuti_description: {
      type: DataTypes.TEXT,
      defaultValue: '-'
    },
    cuti_response: {
      type: DataTypes.TEXT,
      defaultValue: '-'
    },
    status_cuti: {
      type: DataTypes.ENUM("WAIT", "ACC", "REJECT"),
      allowNull: false,
      defaultValue: "WAIT"
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
    modelName: 'cuti',
    freezeTableName: true,
    timestamps: false
  });
  return cuti;
};