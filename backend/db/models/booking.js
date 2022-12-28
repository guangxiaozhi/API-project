'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{
        foreignKey:'userId'
      });
      Booking.belongsTo(models.Spot,{
        foreignKey:'spotId'
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type:DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type:DataTypes.DATEONLY,
      allowNull: false,
      validate:{
        notEquelToStartDate(value){
          if (value == this.startDate) {
            throw new Error('endDate must different with startDate');
          }
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
