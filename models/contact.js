'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    models.contact.belongsTo(models.user)
    models.contact.hasMany(models.contactinfo)
    }
  }
  contact.init({
    userId: DataTypes.INTEGER,
    contactName: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact',
    underscored: true,
    paranoid:true
  });
  return contact;
};