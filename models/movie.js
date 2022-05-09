'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Movie',
    paranoid: true
  });
  return Movie;
};