/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const movieArtist =  sequelize.define(
    "movieArtist",
    {
      movie_artist_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      movie_artist_movie_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      movie_artist_artist_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      tableName: "movie_artist",
      timestamps: false,
    }
  );
  movieArtist.associate = function (models) {
    movieArtist.belongsTo(models.movie, {
      foreignKey: 'movie_artist_movie_id'
    });
    movieArtist.belongsTo(models.artist, {
      foreignKey: 'movie_artist_artist_id',
    });
  };
  return movieArtist
};
