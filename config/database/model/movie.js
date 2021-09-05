/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "movie",
    {
      movie_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      movie_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      movie_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      movie_duration: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      movie_created_at: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      movie_updated_at: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "movie",
      timestamps: false,
    }
  );
};
