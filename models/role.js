'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // to account
        role.hasMany(models.account, {
            foreignKey: 'id_role'
        });
    }
  }
  role.init({
    id_role: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    role_sname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "-"
    },
    role_lname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "-"
    },
    role_description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "-"
    },
    status_role: {
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
    modelName: 'role',
    freezeTableName: true,
    timestamps: false
  });
  return role;
};