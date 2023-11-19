'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shifting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // to schedule
      shifting.hasOne(models.schedule, {
        foreignKey: 'id_shifting'
      });

      // from division
      shifting.belongsTo(models.division, {
        foreignKey: 'id_division',
        as: 'division'
      });

      // from shift_turn
      shifting.belongsTo(models.shift_turn, {
        foreignKey: 'id_shift_turn',
        as: 'shifting_shift_turn'
      });

      // from shift_type
      shifting.belongsTo(models.shift_type, {
        foreignKey: 'id_shift_type',
        as: 'shifting_shift_type'
      });
    }
  }
  shifting.init({
    id_shifting: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    id_division: {
      type: DataTypes.UUID,
      defaultValue: null
    },
    id_shift_type: {
      type: DataTypes.UUID,
      defaultValue: null
    },
    shift_type: {
      type: DataTypes.ENUM("NRM", "HLD", "LNG", "OVT"),
      defaultValue: "NRM"
    },
    id_shift_turn: {
      type: DataTypes.UUID,
      defaultValue: null
    },
    shift_turn: {
      type: DataTypes.ENUM("S1", "S2", "S3", "S4", "XS", "OTH"),
      defaultValue: "OTH"
    },
    shift_start: {
      type: DataTypes.TIME,
      defaultValue: null
    },
    shift_end: {
      type: DataTypes.TIME,
      defaultValue: null
    },
    status_shifting: {
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
    modelName: 'shifting',
    freezeTableName: true,
    timestamps: false
  });
  return shifting;
};