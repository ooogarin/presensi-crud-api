'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init({
    id_account: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name_user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "no_image.png"
    },
    id_account_level: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    status_account: {
      type: DataTypes.ENUM("ACT", "NACT"),
      allowNull: false,
      defaultValue: "ACT"
    },
    token: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    imei: {
      type: DataTypes.STRING(30),
      defaultValue: "-"
    },
    fcm_id: {
      type: DataTypes.STRING(45),
      defaultValue: "-"
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'account',
    freezeTableName: true,
    timestamps: false
  });

  // sequelize.sync({ force: false });

  return account;
};