/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const artist = sequelize.define(
      "artist",
      {
        artist_id: {
          type: DataTypes.INTEGER(10),
          primaryKey: true,
          autoIncrement: true,
        },
        artist_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: "artist",
        timestamps: false,
      }
    );
    artist.associate = function (models) {
        artist.belongsToMany(models.movie, {
            through: 'movie_artist',
            sourceKey: 'artist_id',
            foreignKey: 'movie_artist_artist_id',
            otherKey: 'movie_artist_movie_id' 
        });
    };
    return artist
  };
  