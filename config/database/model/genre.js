/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "genre",
      {
        genre_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        genre_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: "genre",
        timestamps: false,
      }
    );
  };
  