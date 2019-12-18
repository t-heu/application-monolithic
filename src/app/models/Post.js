const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      topic: DataTypes.STRING,
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      sub_title: DataTypes.TEXT,
      image_link: DataTypes.TEXT,
      tags: DataTypes.STRING,
      author: DataTypes.STRING
    }, {
      sequelize,
    })
  }

}

module.exports = Post
